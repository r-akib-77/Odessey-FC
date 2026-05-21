# Auth API Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create login and logout API endpoints.

**Architecture:** Next.js Route Handlers.

**Tech Stack:** Next.js, TypeScript, jose (via src/lib/auth.ts).

---

### Task 1: Setup Directories

- [ ] **Step 1: Create API directories**

Run: `mkdir -p src/app/api/auth/login src/app/api/auth/logout`
Expected: Directories created.

### Task 2: Implement Login Endpoint

**Files:**
- Create: `src/app/api/auth/login/route.ts`

- [ ] **Step 1: Write login route handler**

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

- [ ] **Step 2: Commit login endpoint**

```bash
git add src/app/api/auth/login/route.ts
git commit -m "feat(auth): add login api endpoint"
```

### Task 3: Implement Logout Endpoint

**Files:**
- Create: `src/app/api/auth/logout/route.ts`

- [ ] **Step 1: Write logout route handler**

```typescript
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", { maxAge: 0 });
  return response;
}
```

- [ ] **Step 2: Commit logout endpoint**

```bash
git add src/app/api/auth/logout/route.ts
git commit -m "feat(auth): add logout api endpoint"
```

### Task 4: Verification

- [ ] **Step 1: Verify files exist**

Run: `ls -l src/app/api/auth/login/route.ts src/app/api/auth/logout/route.ts`
Expected: Both files listed.
