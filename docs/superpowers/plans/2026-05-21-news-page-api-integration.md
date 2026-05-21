# News Page API Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transition the News Hub page from using static `dummyData` to fetching real-time data from the `/api/news` endpoint, handling loading and error states.

**Architecture:** Use React `useEffect` and `useState` hooks to manage async data fetching within the existing Client Component.

**Tech Stack:** React, Next.js, Framer Motion, Lucide icons.

---

### Task 1: Setup State and Types

**Files:**
- Modify: `src/app/news/page.tsx`

- [ ] **Step 1: Update imports and define NewsPost interface**

Add `useEffect` to the imports and define the `NewsPost` interface to match the database schema.

```typescript
import { useState, useEffect } from "react";
// ... other imports

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  desc: string;
  date: string;
  category: string;
  image: string;
  featured: number | boolean;
}
```

- [ ] **Step 2: Initialize state variables**

Add `posts`, `isLoading`, and `error` states. Replace the static `NEWS_POSTS` assignment.

```typescript
export default function NewsHub() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);
  // ...
```

- [ ] **Step 3: Commit**

```bash
git add src/app/news/page.tsx
git commit -m "feat(news): add state and types for api integration"
```

---

### Task 2: Implement Data Fetching

**Files:**
- Modify: `src/app/news/page.tsx`

- [ ] **Step 1: Add useEffect for data fetching**

Implement the `useEffect` hook to call `/api/news`.

```typescript
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);
```

- [ ] **Step 2: Update post filtering logic**

Update `featuredPost` and `regularPosts` to use the `posts` state.

```typescript
  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);
```

- [ ] **Step 3: Commit**

```bash
git add src/app/news/page.tsx
git commit -m "feat(news): implement data fetching from /api/news"
```

---

### Task 3: Handle Loading and Error States

**Files:**
- Modify: `src/app/news/page.tsx`

- [ ] **Step 1: Add Loading UI**

Add a simple loading state before the main return or inside the container.

```typescript
  if (isLoading) {
    return (
      <main className="bg-[#0a0a0a] min-h-screen w-full flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Newspaper className="w-12 h-12 text-[#E9C349] animate-pulse" />
          <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Loading News Hub...</p>
        </div>
      </main>
    );
  }
```

- [ ] **Step 2: Add Error UI (Optional but recommended)**

```typescript
  if (error) {
    return (
      <main className="bg-[#0a0a0a] min-h-screen w-full flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <p className="text-[#E9C349] font-bold uppercase tracking-widest">Error Loading News</p>
          <p className="text-gray-400 text-sm max-w-md">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#E9C349] text-black font-bold uppercase text-xs rounded-full"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }
```

- [ ] **Step 3: Commit**

```bash
git add src/app/news/page.tsx
git commit -m "feat(news): add loading and error UI states"
```

---

### Task 4: Cleanup and Verification

**Files:**
- Modify: `src/app/news/page.tsx`

- [ ] **Step 1: Remove unused imports**

Remove `import { dummyData } from "@/dummyData";` and `const NEWS_POSTS = dummyData;`.

- [ ] **Step 2: Run Linting**

Run: `npm run lint` or `npx eslint src/app/news/page.tsx`

- [ ] **Step 3: Final Commit**

```bash
git add src/app/news/page.tsx
git commit -m "cleanup(news): remove dummyData reference and final polish"
```
