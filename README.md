# AKOSSHOP

Standalone frontend-first marketing website built with Next.js 14 + TypeScript + TailwindCSS + Framer Motion.

## Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- lucide-react icons
- next/image and HTML5 video

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` Home page
- `/services` Services page
- `/contact` Contact page
- `/admin` Placeholder page

## Assets

All media is in `public/assets/`:

- `logo.png`
- `IP.mp4`
- `sales-accounts.jpg`
- `megaboostv1.png`

Site icon: `app/icon.png`

## Data Architecture (Future Backend Ready)

The UI maps from `app/lib/services.ts`, which mimics API response shape.

Each service object includes:

- `id`
- `title`
- `tagline`
- `description`
- `features[]`
- `priceText`
- `availableCount`
- `mediaType`
- `mediaSrc`
- `ctaText`

When connecting Node.js + Express + MongoDB Atlas + Admin CMS later, swap static service data for API fetches without rewriting UI components.

## Frontend Features

- Maroon/black neon aesthetic
- Glass blur navbar with pulsing online badge
- Animated glow blobs and gradient motion background
- Staggered page-load and scroll reveal animations
- Hover lift + glow and tilt effect on cards
- Button shine animation
- Animated availability counters
- Fully responsive layout

## Auto Deploy

This repository includes:

- `.github/workflows/deploy.yml`
- `deploy/vps-update.sh`
- `deploy/nginx-akosshop.conf`

The workflow deploys on every push to `main` using SSH key authentication only (no password auth), updates `/opt/akosshop` on the VPS, deploys backend with PM2, builds frontend, publishes static files to `/var/www/akosshop`, and reloads nginx.

### 1) Generate an SSH key pair for GitHub Actions

Run on your local machine:

```bash
ssh-keygen -t ed25519 -C "akosshop-github-actions" -f ~/.ssh/akosshop_actions
```

This creates:

- Private key: `~/.ssh/akosshop_actions`
- Public key: `~/.ssh/akosshop_actions.pub`

### 2) Add the public key to VPS `authorized_keys`

Recommended: use a non-root deploy user with sudo privileges. Root user is supported if you choose it.

On VPS:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cat >> ~/.ssh/authorized_keys << 'EOF'
PASTE_PUBLIC_KEY_CONTENT_HERE
EOF
chmod 600 ~/.ssh/authorized_keys
```

### 3) Add required GitHub repository secrets

In GitHub -> `Settings` -> `Secrets and variables` -> `Actions` -> `Secrets`, add:

- `VPS_HOST` (example: `187.77.191.182`)
- `VPS_USER` (example: `root` or your deploy user)
- `VPS_SSH_KEY` (full private key content from `~/.ssh/akosshop_actions`)

The workflow strips CRLF automatically when writing `VPS_SSH_KEY` (`tr -d '\r'`) and enforces `StrictHostKeyChecking` with `ssh-keyscan` generated `known_hosts`.

### 4) Optional GitHub repository variables

In `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`, you can set:

- `VPS_PORT` (default `22`)
- `BACKEND_DIR` (default auto-detect, prefers `backend/`)
- `BACKEND_ENTRY` (default auto-detect, prefers `server.js`)
- `BACKEND_PORT` (default auto-detect, fallback `5000`)
- `FRONTEND_DIR` (default auto-detect, prefers `dashboard/`)
- `FRONTEND_BUILD_DIR` (default auto-detect: `dist`, `build`, `out`)

### 5) First deployment notes

- The remote script clones/updates repo at `/opt/akosshop` using HTTPS URL and force-syncs to `origin/main` (`git fetch` + `git reset --hard`).
- Backend is started/restarted as PM2 process name: `akosshop-backend`.
- Frontend writes `.env.production` with `VITE_API_BASE_URL=/api`, runs build, and publishes to `/var/www/akosshop`.
- Nginx config is installed from `deploy/nginx-akosshop.conf` for `akosshop.online` and `www.akosshop.online`.

### 6) Enable HTTPS with certbot (after DNS propagation)

After `A` records for `akosshop.online` and `www.akosshop.online` point to your VPS IP, run on VPS:

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d akosshop.online -d www.akosshop.online
sudo certbot renew --dry-run
```
