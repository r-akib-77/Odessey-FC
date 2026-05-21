# News Data API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement News API endpoints for public fetching and admin CRUD using Cloudflare D1.

**Architecture:** Next.js App Router Route Handlers interacting with D1 via `process.env.DB`.

**Tech Stack:** Next.js, TypeScript, Cloudflare D1.

---

### Task 1: Public News Fetching

**Files:**
- Create: `src/app/api/news/route.ts`

- [ ] **Step 1: Implement GET handler**

```typescript
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { results } = await db.prepare("SELECT * FROM news ORDER BY id DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/news/route.ts
git commit -m "feat: implement public news fetching api"
```

---

### Task 2: Admin News Management (List and Create)

**Files:**
- Create: `src/app/api/admin/news/route.ts`

- [ ] **Step 1: Implement GET and POST handlers**

```typescript
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { results } = await db.prepare("SELECT * FROM news ORDER BY id DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching news for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const body = await request.json();
    const { title, slug, desc, date, category, image, featured } = body;

    if (!title || !slug || !date || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle featured logic
    if (featured === 1) {
      await db.prepare("UPDATE news SET featured = 0").run();
    }

    const info = await db
      .prepare(
        "INSERT INTO news (title, slug, desc, date, category, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(title, slug, desc, date, category, image, featured || 0)
      .run();

    return NextResponse.json({ success: true, id: info.meta.last_row_id });
  } catch (error: any) {
    console.error("Error creating news:", error);
    if (error.message?.includes("UNIQUE constraint failed: news.slug")) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/news/route.ts
git commit -m "feat: implement admin news management api"
```

---

### Task 3: Admin News Deletion

**Files:**
- Create: `src/app/api/admin/news/[id]/route.ts`

- [ ] **Step 1: Implement DELETE handler**

```typescript
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { id } = params;

    await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/news/[id]/route.ts
git commit -m "feat: implement admin news deletion api"
```
