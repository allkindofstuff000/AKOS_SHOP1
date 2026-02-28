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

## Manual deployment

### 1) Install system packages (Ubuntu VPS)

```bash
sudo apt update
sudo apt install -y git nginx curl ca-certificates rsync
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 2) Clone project and build

```bash
sudo rm -rf /opt/akosshop
sudo git clone https://github.com/allkindofstuff000/AKOS_SHOP1.git /opt/akosshop
cd /opt/akosshop
npm ci
npm run build
```

### 3A) Static export + Nginx (preferred)

`next.config.mjs` is configured with `output: "export"`, so build output is generated in `out/`.

```bash
sudo mkdir -p /var/www/akosshop
sudo rsync -a --delete /opt/akosshop/out/ /var/www/akosshop/
sudo chown -R www-data:www-data /var/www/akosshop
```

Create Nginx config:

```bash
sudo tee /etc/nginx/sites-available/akosshop.online > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name akosshop.online www.akosshop.online;

    root /var/www/akosshop;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /_next/static/ {
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }
}
EOF

sudo ln -sfn /etc/nginx/sites-available/akosshop.online /etc/nginx/sites-enabled/akosshop.online
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 3B) Next.js server via PM2 + Nginx reverse proxy (fallback)

Use this only if static export is not suitable for your app.

```bash
cd /opt/akosshop
npm ci
npm run build
sudo npm install -g pm2
pm2 delete akosshop || true
pm2 start "npm run start -- -H 127.0.0.1 -p 3000" --name akosshop --cwd /opt/akosshop
pm2 save
pm2 startup systemd -u root --hp /root
```

Create Nginx reverse-proxy config:

```bash
sudo tee /etc/nginx/sites-available/akosshop.online > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name akosshop.online www.akosshop.online;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

sudo ln -sfn /etc/nginx/sites-available/akosshop.online /etc/nginx/sites-enabled/akosshop.online
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 4) Optional SSL (after DNS points to 187.77.191.182)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d akosshop.online -d www.akosshop.online
sudo certbot renew --dry-run
```
