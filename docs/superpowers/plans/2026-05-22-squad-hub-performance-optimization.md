# Squad Hub Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile lag on the Squad Hub page by compressing massive images and optimizing CSS rendering.

**Architecture:** 
1. Batch compress all player images to <300KB using `sharp`.
2. Replace the expensive `bg-fixed` CSS property with a performant fixed-position background layer.
3. Optimize `next/image` attributes for better loading performance.

**Tech Stack:** Next.js, Tailwind CSS, Sharp, Framer Motion.

---

### Task 1: Image Compression

**Files:**
- Create: `scripts/compress-images.js`
- Modify: `public/players/*.jpeg` (compressed in place)

- [ ] **Step 1: Create the compression script**

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'public/players';

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.JPEG')) {
    const filePath = path.join(directory, file);
    const tmpPath = path.join(directory, `tmp_${file}`);
    
    console.log(`Compressing ${file}...`);
    
    sharp(filePath)
      .resize(800) // Resize to a reasonable mobile/desktop width
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(tmpPath)
      .then(() => {
        fs.renameSync(tmpPath, filePath);
        console.log(`Done: ${file}`);
      })
      .catch(err => console.error(`Error compressing ${file}:`, err));
  }
});
```

- [ ] **Step 2: Run the compression script**

Run: `node scripts/compress-images.js`
Expected: All images in `public/players/` are significantly reduced in size.

- [ ] **Step 3: Verify image sizes**

Run: `ls -lh public/players/`
Expected: No image is larger than 500KB.

- [ ] **Step 4: Commit images**

```bash
git add public/players/
git commit -m "perf: compress player images for better mobile performance"
```

---

### Task 2: Background CSS Optimization

**Files:**
- Modify: `src/app/squad-hub/page.tsx`

- [ ] **Step 1: Remove bg-fixed and add fixed background div**

Replace the `main` class and add the background div:

```tsx
// Before
<main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed ...">

// After
<main className="min-h-screen w-full text-white px-2.5 sm:px-4 py-12 md:py-24 overflow-hidden relative">
  {/* Performance-optimized fixed background */}
  <div 
    className="fixed inset-0 z-[-1] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.99)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat"
    style={{ willChange: 'transform' }}
  />
```

- [ ] **Step 2: Commit changes**

```bash
git add src/app/squad-hub/page.tsx
git commit -m "perf: optimize background rendering for mobile"
```

---

### Task 3: Image Loading Optimization

**Files:**
- Modify: `src/app/squad-hub/page.tsx`

- [ ] **Step 1: Update Image component attributes**

Ensure `sizes` and `priority` are optimal.

```tsx
<Image
  src={player.image}
  alt={player.name}
  fill
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  priority={player.id <= 4}
  className={...}
/>
```

- [ ] **Step 2: Commit changes**

```bash
git add src/app/squad-hub/page.tsx
git commit -m "perf: optimize image loading priority and sizes"
```
