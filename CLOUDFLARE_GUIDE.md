# Cloudflare Pages Deployment Guide for Odyssey FC

Your 404 error was caused by Next.js App Router features (like D1/R2 and Edge Runtime) not being correctly transformed for Cloudflare's infrastructure. I have applied the following fixes:

1.  **Installed `@cloudflare/next-on-pages`**: This tool is required to convert a Next.js build into a Cloudflare Pages compatible format.
2.  **Added `pages:build` script**: Updated `package.json` to include the correct build sequence.
3.  **Configured Edge Runtime**: Added `export const runtime = "edge"` to all dynamic routes (/api/auth/login, /api/auth/logout, /news/[slug]).
4.  **Created `wrangler.toml`**: Added the D1 database binding configuration.

## 🚀 Required Cloudflare Dashboard Settings

To fix the 404 on your live site, please update your Cloudflare Pages project settings:

### 1. Build Settings
- **Framework preset**: `None` (or `Next.js` if it allows custom commands)
- **Build command**: `bun run pages:build`
- **Output directory**: `.vercel/output/static`

### 2. Environment Variables
Ensure the following variables are set in the Cloudflare Dashboard (under Settings > Environment Variables):
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `R2_S3_ENDPOINT`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`

### 3. Bindings (Functions)
Go to **Settings > Functions > D1 database bindings**:
- **Variable name**: `DB`
- **D1 database**: Select your actual D1 database.

### 4. Compatibility Tooling
Ensure **Compatibility date** is set to `2026-05-21` or later.

---

## 🛠️ Local Development
To test the Cloudflare-transformed build locally:
```bash
bun run pages:build
npx wrangler pages dev .vercel/output/static --compatibility-date=2026-05-21 --d1=DB=your-db-id
```
