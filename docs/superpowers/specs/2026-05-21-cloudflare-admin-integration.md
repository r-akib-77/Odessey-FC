# Design Spec: Cloudflare Pages + Admin Panel Integration

**Date:** 2026-05-21  
**Status:** Draft  
**Topic:** Admin Panel, Cloudflare D1, Cloudflare R2, JWT Auth

## 1. Overview
Transform the current mock-based news management into a functional system hosted on Cloudflare Pages. This includes real-time authentication, structured data storage in Cloudflare D1, and media asset management in Cloudflare R2.

## 2. Technical Stack
- **Hosting:** Cloudflare Pages (Next.js App Router)
- **Database:** Cloudflare D1 (SQLite)
- **Object Storage:** Cloudflare R2
- **Auth:** Custom JWT + Middleware
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 3. Database Schema (Cloudflare D1)
Table: `news`
```sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  desc TEXT,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  featured INTEGER DEFAULT 0
);
```

## 4. Authentication Logic
- **Credentials:** Stored in environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).
- **Secret:** `JWT_SECRET` for signing tokens.
- **Login Endpoint:** `POST /api/auth/login`
  - Validates credentials.
  - Sets `admin_token` cookie (HttpOnly, Secure, SameSite=Strict).
- **Middleware:** `middleware.ts`
  - Runs on `/admin/*` and `/api/admin/*`.
  - Redirects to `/admin/login` if token is missing or invalid.

## 5. Storage Flow (Cloudflare R2)
- Images uploaded via the Admin Panel are sent to `POST /api/admin/upload`.
- Files are saved to R2 with a unique filename (e.g., `news/123456789-image.jpg`).
- The database stores the R2 public access URL.

## 6. Admin Panel Functionality
- **`/admin/login`**: Simple login interface.
- **`/admin`**: Dashboard showing the list of news posts with "Delete" and "Add New" options.
- **Form:**
  - Title (Auto-generates slug)
  - Category (Dropdown)
  - Date (Date picker)
  - Description (Textarea)
  - Featured (Toggle)
  - Image (File upload to R2)

## 7. Environment Variables
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_this_immediately
JWT_SECRET=super_secret_key
R2_PUBLIC_URL=https://your-r2-public-url.com
```

## 8. Success Criteria
- [ ] Admin can log in securely from any device.
- [ ] Admin panel is protected by middleware.
- [ ] News posts are saved to and fetched from Cloudflare D1.
- [ ] Images are uploaded to and served from Cloudflare R2.
- [ ] Frontend news page displays real data from D1.
