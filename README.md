# 🌌 Odyssey FC — Digital Club Hub

Welcome to the official frontend portal framework for **Odyssey FC**. This application delivers a premium, highly responsive dark-aesthetic user interface designed to bridge fans, players, and corporate partners. Built with cutting-edge React architectures, it provides fluid motion design alongside clean backend control panels.

---

## 🚀 Key Feature Frameworks

### ⚽ 1. First-Team Squad Hub

- **Fluid Filter Arrays:** Instantly query roster segments (Forwards, Midfielders, Defenders, Goalkeepers) powered by unified state layouts.
- **Layout-Aware Transitions:** Leverages Framer Motion's `AnimatePresence` and `layout="position"` profiles to shift card positions cleanly during filter adjustments without breaking viewport layouts.
- **Smart Render Safety:** Bypasses post-render cascading effect cycles by safely computing active state values inside the render tree.

### 🏆 2. Championship & Sponsorship News Engine

- **Asynchronous [slug] Router:** Fully integrated into the Next.js App Router framework using asynchronous `params` Promise compilation blocks.
- **Mobile-Optimized Assets:** Implements Next.js `<Image>` containers configured with proportional `sizes` layouts to prevent viewport bleeding on phones.
- **SEO-Friendly Architecture:** Automates readable path links from clean dataset inputs.

### 🔒 3. Backoffice Admin Workspace Panel

- **Dynamic Form Actions:** Interactive dashboard allowing administrators to easily generate new press releases on the fly.
- **Automated Slug Sanitizer:** Client-side regular expression formatter that handles spaces, special characters, and uppercase structures to auto-generate legal URLs in real-time.
- **Frontend Media Stream Previews:** Implements sandbox `URL.createObjectURL()` browser bindings to render immediate, lightweight image uploads completely on the client side without clunky server requirements.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js (App Router, Server & Client Architectures)
- **Styling:** Tailwind CSS & Tailwind Typography (`prose`)
- **Animation Matrix:** Framer Motion (Spring Physics & Stagger Hooks)
- **Icon Engine:** Lucide React

```text
src/
├── app/
│   ├── page.tsx            # Club Homepage / Landing interface
│   ├── layout.tsx          # Global Shell (Providers, Fonts, Header/Footer)
│   ├── globals.css         # Tailwind Core & Ambient Background Glow configurations
│   ├── not-found.tsx       # Custom 404 Fallback routing screen
│   │
│   ├── news/               # Core Media Hub
│   │   ├── page.tsx        # News grid list view with Featured banner layout
│   │   ├── [slug]/
│   │   │   └── page.tsx    # Mobile-responsive single article layout view
│   │   └── admin/
│   │       └── page.tsx    # Backoffice Admin dashboard form with live blob preview
│   │
│   ├── squad-hub/          # Interactive first-team roster filter array
│   │   └── page.tsx
│   │
│   ├── admin/              # Global Admin portal controls
│   ├── components/         # Page-specific block layouts
│   ├── give-trials/        # Recruitment / Trials registry pipeline
│   ├── management/         # Boardroom / Corporate structure pages
│   ├── play-vs/            # Fixtures, Results, and Matchday tracking systems
│   ├── privacy/            # Privacy Policy documentation
│   └── terms/              # Terms of Service documentation
│
├── components/             # Shared UI components (Buttons, Cards, Inputs)
├── lib/                    # Shared configurations and context functions
└── dummyData.ts            # Central client-side data source of truth (News feeds, player records)
```
