# Admin Panel Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate real API calls into the Admin Panel for news management and image uploads.

**Architecture:** Frontend using Next.js client components, interacting with Edge API routes (D1/R2).

**Tech Stack:** Next.js, TypeScript, Lucide React, Framer Motion.

---

### Task 1: Setup State and Initial Fetching

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Update imports and state declarations**
Add `useEffect`, `useRouter`, and new state variables for loading and file management.

- [ ] **Step 2: Implement `fetchNews` function**
Create an async function to fetch news from `/api/admin/news`.

- [ ] **Step 3: Call `fetchNews` in `useEffect`**
Fetch data on component mount.

### Task 2: Implement Image Upload and News Submission

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Update `handleLocalImageChange`**
Store the `File` object in state.

- [ ] **Step 2: Update `handleSubmit` to handle API calls**
First upload to `/api/admin/upload`, then POST to `/api/admin/news`. Handle loading states.

### Task 3: Implement Deletion and Logout

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Update `handleDelete`**
Call `DELETE /api/admin/news/[id]`.

- [ ] **Step 2: Implement `handleLogout`**
Call `/api/auth/logout` and redirect.

- [ ] **Step 3: Add Logout button to UI**
Update the header to include the logout button.

### Task 4: UI Polish and Status Badge

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Update status badge**
Change "MOCK_MODE" to "LIVE_D1_R2".

- [ ] **Step 2: Add loading feedback**
Disable buttons and show "Uploading..." or "Saving..." text when active.

---
## Self-Review
1. **Spec coverage:** All points from the design spec are covered.
2. **Placeholder scan:** No placeholders.
3. **Type consistency:** Using existing `NewsFormState` and adding `File` type for uploads.
