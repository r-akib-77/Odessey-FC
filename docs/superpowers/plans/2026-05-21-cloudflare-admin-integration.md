# Cloudflare Pages + Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the mock news management into a functional system with Cloudflare D1/R2 and JWT authentication.

**Architecture:** Custom JWT authentication using `jose` and Middleware. Cloudflare D1 for SQL data and R2 for image storage. API routes handle all backend logic.

**Tech Stack:** Next.js (App Router), Cloudflare D1, Cloudflare R2, `jose` (JWT), Lucide React, Framer Motion.

---

### Task 1: Environment & Dependencies

**Files:**
- Create: `.env.local`
- Modify: `package.json`

- [ ] **Step 1: Install `jose` for Edge-compatible JWT**
Run: `bun add jose`

- [ ] **Step 2: Create `.env.local` with placeholders**
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_pass
JWT_SECRET=super_secret_key_change_me
R2_PUBLIC_URL=https://placeholder-r2-url.com
```

- [ ] **Step 3: Commit**
```bash
git add package.json bun.lock .env.local
git commit -m "chore: setup dependencies and env placeholders"
```

---

### Task 2: D1 Database Schema

**Files:**
- Create: `schema.sql`

- [ ] **Step 1: Create the D1 schema file**
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

- [ ] **Step 2: Commit**
```bash
git add schema.sql
git commit -m "feat: add D1 database schema"
```

---

### Task 3: Authentication Infrastructure

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Implement JWT utility in `src/lib/auth.ts`**
```typescript
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    return null;
  }
}
```

- [ ] **Step 2: Implement `src/middleware.ts`**
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

- [ ] **Step 3: Commit**
```bash
git add src/lib/auth.ts src/middleware.ts
git commit -m "feat: implement JWT auth and middleware protection"
```

---

### Task 4: Auth API Endpoints

**Files:**
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`

- [ ] **Step 1: Create login endpoint**
```typescript
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = await createToken({ username });
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2, // 2 hours
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
```

- [ ] **Step 2: Create logout endpoint**
```typescript
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", { maxAge: 0 });
  return response;
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/api/auth/login/route.ts src/app/api/auth/logout/route.ts
git commit -m "feat: add login and logout API endpoints"
```

---

### Task 5: Admin Login Page

**Files:**
- Create: `src/app/admin/login/page.tsx`

- [ ] **Step 1: Implement Login UI**
Use a styled form consistent with the project's aesthetic (dark mode, gold accents).

- [ ] **Step 2: Commit**
```bash
git add src/app/admin/login/page.tsx
git commit -m "feat: add admin login page"
```

---

### Task 6: Data API (D1)

**Files:**
- Create: `src/app/api/news/route.ts`
- Create: `src/app/api/admin/news/route.ts`
- Create: `src/app/api/admin/news/[id]/route.ts`

- [ ] **Step 1: Implement Public News Fetching**
Fetching from Cloudflare D1.

- [ ] **Step 2: Implement Admin CRUD**
Handling POST and DELETE for news management.

- [ ] **Step 3: Commit**
```bash
git add src/app/api/news/route.ts src/app/api/admin/news/route.ts src/app/api/admin/news/[id]/route.ts
git commit -m "feat: implement D1 API routes for news"
```

---

### Task 7: R2 Upload API

**Files:**
- Create: `src/app/api/admin/upload/route.ts`

- [ ] **Step 1: Implement File Upload to R2**
Using the Cloudflare R2 binding.

- [ ] **Step 2: Commit**
```bash
git add src/app/api/admin/upload/route.ts
git commit -m "feat: implement R2 upload API"
```

---

### Task 8: Admin Panel Integration

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Replace mock state with API calls**
Update `useEffect` to fetch list, update `handleSubmit` to upload to R2 and then save to D1.

- [ ] **Step 2: Commit**
```bash
git add src/app/admin/page.tsx
git commit -m "feat: connect admin panel to real APIs"
```

---

### Task 9: Frontend News Page Integration

**Files:**
- Modify: `src/app/news/page.tsx`

- [ ] **Step 1: Fetch news from API instead of dummyData**

- [ ] **Step 2: Commit**
```bash
git add src/app/news/page.tsx
git commit -m "feat: connect frontend news page to D1"
```
