#!/usr/bin/env bash
set -Eeuo pipefail

log() {
  printf '[%s] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

warn() {
  log "WARN: $*"
}

fail() {
  log "ERROR: $*"
  exit 1
}

trap 'fail "Deployment failed at line ${LINENO}."' ERR

REPO_URL="${REPO_URL:?REPO_URL is required}"
REPO_BRANCH="${REPO_BRANCH:-main}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/opt/akosshop}"
WEB_ROOT="${WEB_ROOT:-/var/www/akosshop}"
DOMAIN="${DOMAIN:-akosshop.online}"
DOMAIN_WWW="${DOMAIN_WWW:-www.${DOMAIN}}"
BACKEND_APP_NAME="${BACKEND_APP_NAME:-akosshop-backend}"
BACKEND_DIR="${BACKEND_DIR:-}"
BACKEND_ENTRY="${BACKEND_ENTRY:-}"
BACKEND_PORT="${BACKEND_PORT:-}"
FRONTEND_DIR="${FRONTEND_DIR:-}"
FRONTEND_BUILD_DIR="${FRONTEND_BUILD_DIR:-}"
NGINX_TEMPLATE="${NGINX_TEMPLATE:-/tmp/nginx-akosshop.conf}"

IS_ROOT=0
if [[ "$(id -u)" -eq 0 ]]; then
  IS_ROOT=1
fi

run_privileged() {
  if [[ "$IS_ROOT" -eq 1 ]]; then
    "$@"
  else
    sudo "$@"
  fi
}

require_command() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || fail "Missing required command: $cmd"
}

resolve_path() {
  local value="$1"
  if [[ "$value" = /* ]]; then
    printf '%s\n' "$value"
  else
    printf '%s/%s\n' "$DEPLOY_ROOT" "$value"
  fi
}

install_dependencies() {
  local dir="$1"
  log "Installing dependencies in $dir"
  if [[ -f "$dir/package-lock.json" ]]; then
    (cd "$dir" && npm ci) || (cd "$dir" && npm install)
  else
    (cd "$dir" && npm install)
  fi
}

update_repo() {
  run_privileged mkdir -p "$DEPLOY_ROOT"
  if [[ ! -w "$DEPLOY_ROOT" ]]; then
    log "Granting write access to $(id -un):$(id -gn) on $DEPLOY_ROOT"
    run_privileged chown -R "$(id -un):$(id -gn)" "$DEPLOY_ROOT"
  fi

  if [[ -d "$DEPLOY_ROOT/.git" ]]; then
    log "Updating existing repository in $DEPLOY_ROOT"
    git -C "$DEPLOY_ROOT" fetch --prune origin "$REPO_BRANCH"
    git -C "$DEPLOY_ROOT" reset --hard "origin/$REPO_BRANCH"
  else
    if [[ -n "$(ls -A "$DEPLOY_ROOT" 2>/dev/null)" ]]; then
      fail "$DEPLOY_ROOT exists and is not empty, but is not a git repository."
    fi
    log "Cloning repository from $REPO_URL to $DEPLOY_ROOT"
    git clone --branch "$REPO_BRANCH" --depth 1 "$REPO_URL" "$DEPLOY_ROOT"
  fi
}

detect_backend_dir() {
  local candidate

  if [[ -n "$BACKEND_DIR" ]]; then
    candidate="$(resolve_path "$BACKEND_DIR")"
    [[ -f "$candidate/package.json" ]] || fail "BACKEND_DIR is invalid: $candidate"
    printf '%s\n' "$candidate"
    return 0
  fi

  for rel in backend api server; do
    candidate="$DEPLOY_ROOT/$rel"
    if [[ -f "$candidate/package.json" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  if [[ -f "$DEPLOY_ROOT/package.json" ]]; then
    for entry in server.js index.js app.js main.js; do
      if [[ -f "$DEPLOY_ROOT/$entry" ]]; then
        printf '%s\n' "$DEPLOY_ROOT"
        return 0
      fi
    done
  fi

  while IFS= read -r pkg; do
    candidate="$(dirname "$pkg")"
    if [[ -f "$candidate/server.js" || -f "$candidate/index.js" || -f "$candidate/app.js" || -f "$candidate/main.js" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done < <(find "$DEPLOY_ROOT" -maxdepth 4 -type f -name package.json -not -path '*/node_modules/*' -not -path '*/.git/*')

  return 1
}

detect_backend_entry() {
  local dir="$1"
  local candidate
  local main_field

  if [[ -n "$BACKEND_ENTRY" ]]; then
    if [[ "$BACKEND_ENTRY" = /* ]]; then
      candidate="$BACKEND_ENTRY"
    else
      candidate="$dir/$BACKEND_ENTRY"
    fi
    [[ -f "$candidate" ]] || fail "BACKEND_ENTRY is invalid: $candidate"
    printf '%s\n' "$candidate"
    return 0
  fi

  for candidate in server.js index.js app.js main.js; do
    if [[ -f "$dir/$candidate" ]]; then
      printf '%s\n' "$dir/$candidate"
      return 0
    fi
  done

  main_field="$(node -e "try{const p=require(process.argv[1]);if(p.main)process.stdout.write(p.main);}catch(e){}" "$dir/package.json" 2>/dev/null || true)"
  if [[ -n "$main_field" && -f "$dir/$main_field" ]]; then
    printf '%s\n' "$dir/$main_field"
    return 0
  fi

  return 1
}

detect_backend_port() {
  local dir="$1"
  local entry="$2"
  local env_port
  local code_port

  if [[ -n "$BACKEND_PORT" ]]; then
    [[ "$BACKEND_PORT" =~ ^[0-9]{2,5}$ ]] || fail "BACKEND_PORT must be numeric, got: $BACKEND_PORT"
    printf '%s\n' "$BACKEND_PORT"
    return 0
  fi

  if [[ -f "$dir/.env" ]]; then
    env_port="$(grep -E '^[[:space:]]*PORT[[:space:]]*=' "$dir/.env" | tail -n 1 | cut -d '=' -f2- | tr -d "\"'[:space:]" || true)"
    if [[ "$env_port" =~ ^[0-9]{2,5}$ ]]; then
      printf '%s\n' "$env_port"
      return 0
    fi
  fi

  code_port="$(grep -Eo '\|\|[[:space:]]*[0-9]{2,5}' "$entry" 2>/dev/null | head -n 1 | tr -dc '0-9' || true)"
  if [[ "$code_port" =~ ^[0-9]{2,5}$ ]]; then
    printf '%s\n' "$code_port"
    return 0
  fi

  printf '5000\n'
}

deploy_backend() {
  local dir="$1"
  local entry="$2"

  install_dependencies "$dir"

  if ! command -v pm2 >/dev/null 2>&1; then
    warn "pm2 not found, installing globally"
    if [[ "$IS_ROOT" -eq 1 ]]; then
      npm install -g pm2
    else
      run_privileged npm install -g pm2
    fi
  fi
  require_command pm2

  if pm2 describe "$BACKEND_APP_NAME" >/dev/null 2>&1; then
    log "Restarting PM2 process: $BACKEND_APP_NAME"
    pm2 restart "$BACKEND_APP_NAME" --update-env
  else
    log "Starting PM2 process: $BACKEND_APP_NAME -> $entry"
    pm2 start "$entry" --name "$BACKEND_APP_NAME" --cwd "$dir"
  fi

  pm2 save
}

detect_frontend_dir() {
  local candidate

  if [[ -n "$FRONTEND_DIR" ]]; then
    candidate="$(resolve_path "$FRONTEND_DIR")"
    [[ -f "$candidate/package.json" ]] || fail "FRONTEND_DIR is invalid: $candidate"
    printf '%s\n' "$candidate"
    return 0
  fi

  for rel in dashboard frontend client web; do
    candidate="$DEPLOY_ROOT/$rel"
    if [[ -f "$candidate/package.json" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  if [[ -f "$DEPLOY_ROOT/package.json" ]]; then
    printf '%s\n' "$DEPLOY_ROOT"
    return 0
  fi

  while IFS= read -r pkg; do
    candidate="$(dirname "$pkg")"
    if [[ "$candidate" != "$BACKEND_RESOLVED_DIR" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done < <(find "$DEPLOY_ROOT" -maxdepth 4 -type f -name package.json -not -path '*/node_modules/*' -not -path '*/.git/*')

  return 1
}

resolve_frontend_build_output() {
  local dir="$1"
  local candidate

  if [[ -n "$FRONTEND_BUILD_DIR" ]]; then
    if [[ "$FRONTEND_BUILD_DIR" = /* ]]; then
      [[ -d "$FRONTEND_BUILD_DIR" ]] || fail "FRONTEND_BUILD_DIR not found: $FRONTEND_BUILD_DIR"
      printf '%s\n' "$FRONTEND_BUILD_DIR"
      return 0
    fi
    candidate="$dir/$FRONTEND_BUILD_DIR"
    [[ -d "$candidate" ]] || fail "FRONTEND_BUILD_DIR not found: $candidate"
    printf '%s\n' "$candidate"
    return 0
  fi

  for candidate in dist build out; do
    if [[ -d "$dir/$candidate" ]]; then
      printf '%s\n' "$dir/$candidate"
      return 0
    fi
  done

  return 1
}

deploy_frontend() {
  local dir="$1"
  local output_dir

  install_dependencies "$dir"

  log "Writing $dir/.env.production"
  printf 'VITE_API_BASE_URL=/api\n' > "$dir/.env.production"

  log "Building frontend from $dir"
  (cd "$dir" && npm run build)

  output_dir="$(resolve_frontend_build_output "$dir" || true)"
  [[ -n "$output_dir" ]] || fail "Could not find frontend build output. Set FRONTEND_BUILD_DIR."

  run_privileged mkdir -p "$WEB_ROOT"
  log "Publishing $output_dir -> $WEB_ROOT"
  if command -v rsync >/dev/null 2>&1; then
    run_privileged rsync -a --delete "$output_dir"/ "$WEB_ROOT"/
  else
    warn "rsync not found, using cp fallback"
    run_privileged find "$WEB_ROOT" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
    run_privileged cp -a "$output_dir"/. "$WEB_ROOT"/
  fi

  run_privileged chown -R www-data:www-data "$WEB_ROOT"
}

configure_nginx() {
  local backend_port="$1"
  local template="$NGINX_TEMPLATE"
  local site_file="/etc/nginx/sites-available/$DOMAIN"
  local enabled_file="/etc/nginx/sites-enabled/$DOMAIN"
  local api_upstream="127.0.0.1:${backend_port}"
  local tmp_config

  require_command nginx
  if [[ ! -f "$template" ]]; then
    if [[ -f "$DEPLOY_ROOT/deploy/nginx-akosshop.conf" ]]; then
      template="$DEPLOY_ROOT/deploy/nginx-akosshop.conf"
    else
      fail "Nginx template not found at $NGINX_TEMPLATE or $DEPLOY_ROOT/deploy/nginx-akosshop.conf"
    fi
  fi

  tmp_config="$(mktemp)"
  sed \
    -e "s|__DOMAIN__|$DOMAIN|g" \
    -e "s|__DOMAIN_WWW__|$DOMAIN_WWW|g" \
    -e "s|__WEB_ROOT__|$WEB_ROOT|g" \
    -e "s|__API_UPSTREAM__|$api_upstream|g" \
    "$template" > "$tmp_config"

  log "Installing nginx site config: $site_file"
  run_privileged install -m 0644 "$tmp_config" "$site_file"
  rm -f "$tmp_config"

  run_privileged ln -sfn "$site_file" "$enabled_file"
  if [[ -e /etc/nginx/sites-enabled/default ]]; then
    run_privileged rm -f /etc/nginx/sites-enabled/default
  fi

  log "Validating nginx configuration"
  run_privileged nginx -t
  run_privileged systemctl reload nginx
}

run_health_check() {
  local backend_port="$1"
  if command -v curl >/dev/null 2>&1; then
    log "Health check: http://127.0.0.1:${backend_port}/health"
    curl -fsS "http://127.0.0.1:${backend_port}/health" || warn "Health endpoint check failed (non-blocking)"
  else
    warn "curl not installed, skipping health check"
  fi
}

log "Starting deployment on host $(hostname)"
if [[ "$IS_ROOT" -eq 0 ]]; then
  require_command sudo
fi
require_command git
require_command node
require_command npm

update_repo

BACKEND_RESOLVED_DIR=""
BACKEND_RESOLVED_ENTRY=""
BACKEND_PORT_RESOLVED="5000"

if BACKEND_RESOLVED_DIR="$(detect_backend_dir)"; then
  log "Backend detected at $BACKEND_RESOLVED_DIR"
  BACKEND_RESOLVED_ENTRY="$(detect_backend_entry "$BACKEND_RESOLVED_DIR" || true)"
  if [[ -n "$BACKEND_RESOLVED_ENTRY" ]]; then
    deploy_backend "$BACKEND_RESOLVED_DIR" "$BACKEND_RESOLVED_ENTRY"
    BACKEND_PORT_RESOLVED="$(detect_backend_port "$BACKEND_RESOLVED_DIR" "$BACKEND_RESOLVED_ENTRY")"
  else
    warn "Backend directory found but no entry file detected. Skipping PM2 deploy."
  fi
else
  warn "No backend detected. Skipping PM2 deploy."
  if [[ -n "$BACKEND_PORT" ]]; then
    BACKEND_PORT_RESOLVED="$BACKEND_PORT"
  fi
fi

log "Backend API upstream port: $BACKEND_PORT_RESOLVED"

FRONTEND_RESOLVED_DIR="$(detect_frontend_dir || true)"
[[ -n "$FRONTEND_RESOLVED_DIR" ]] || fail "Could not detect frontend directory. Set FRONTEND_DIR."
log "Frontend detected at $FRONTEND_RESOLVED_DIR"
deploy_frontend "$FRONTEND_RESOLVED_DIR"

configure_nginx "$BACKEND_PORT_RESOLVED"
run_health_check "$BACKEND_PORT_RESOLVED"

log "Deployment finished successfully."
