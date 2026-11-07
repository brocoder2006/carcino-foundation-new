# Project Architecture & Directory Structure

Welcome to **The Carcino Foundation** web platform codebase. This document outlines the folder conventions, component structure, and design patterns to ensure modular, maintainable, and scalable future development.

---

## 📁 High-Level Directory Overview

```text
carcino-foundation-new/
├── public/                 # Static assets (images, icons, vectors, fonts)
│   ├── assets/             # Core interactive assets (e.g. story backgrounds)
│   ├── gallery/            # Visual gallery photos
│   ├── images/             # Feature & editorial illustrations
│   ├── podcasts/           # Podcast episode covers
│   └── fonts/              # Web font files
│
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, and API routes)
│   │   ├── (routes)/       # articles/, blogs/, gallery/, team/, privacy/, terms/, login/
│   │   ├── api/            # Serverless API routes (contact, volunteers, partnerships, etc.)
│   │   ├── layout.tsx      # Root HTML layout, SEO meta tags, Google Tag Manager & fonts
│   │   ├── page.tsx        # Homepage / Landing page
│   │   ├── robots.ts       # Dynamic robots.txt configuration for search engines
│   │   └── sitemap.ts      # Dynamic sitemap.xml for Google indexing
│   │
│   ├── components/         # Organized React UI components
│   │   ├── sections/       # Full-page sections (Hero, Story, Carousel, About, FAQ, Footer)
│   │   ├── modals/         # Form & dialog overlays (Auth, Volunteer, Partnership)
│   │   ├── navigation/     # Header navigation bars, popovers, and menu trees
│   │   ├── ui/             # Reusable primitives (Buttons, Badges, Tooltips, Animation wrappers)
│   │   └── index.ts        # Central barrel export for clean imports across the app
│   │
│   ├── context/            # React context state providers (AuthContext)
│   ├── data/               # Static models, articles data, and constants
│   ├── fonts/              # Local TTF/WOFF font definitions
│   ├── lib/                # API clients & backend utilities
│   │   ├── supabaseClient.ts           # Supabase DB client & health checks
│   │   ├── djangoApi.ts                # Django Headless CMS integration
│   │   ├── rateLimit.ts                # Edge & API request rate-limiting
│   │   ├── registrationBatchService.ts # Registration batch processing
│   │   └── utils.ts                    # ClassName & general helper functions
│   │
│   └── types/              # Centralized TypeScript interfaces & data contracts
│       ├── auth.ts         # User profiles, session contracts, auth context
│       ├── article.ts      # Articles, citations, sections, and FAQ structures
│       ├── django.ts       # Headless CMS posts, campaigns, and podcasts
│       └── index.ts        # Single export entry point
│
├── supabase/               # Database definitions & setup
│   ├── schemas/            # SQL schemas and table policies
│   └── README.md           # Database setup and migration instructions
│
├── blog-cms/               # Independent Django CMS backend & admin studio
├── next.config.ts          # Next.js configuration & compiler options
├── tsconfig.json           # TypeScript configuration with `@/*` path aliases
└── package.json            # Project dependencies & build scripts
```

---

## 🧩 Component Development Conventions

### 1. Barrel Imports via `@/components`
All components can now be imported cleanly from `@/components`:

```typescript
import { 
  AnimatedStory, 
  HeroCarouselSection, 
  FooterSection, 
  AuthModal, 
  GetInvolvedDropdown 
} from "@/components";
```

*(Direct sub-folder imports like `@/components/sections/AnimatedStory` and backward-compatible `@/components/AnimatedStory` are both fully supported).*

### 2. Category Organization
- **`sections/`**: Self-contained visual segments that form pages. Each section keeps any co-located stylesheet (`.css` / `.module.css`) inside its folder or side-by-side with the component.
- **`modals/`**: Accessible interactive overlays triggered by user actions (forms, dialogs, auth).
- **`navigation/`**: Floating bars, mobile drawers, and popovers.
- **`ui/`**: Low-level building blocks designed for high reuse across different sections.

---

## 🏷️ TypeScript Types (`src/types/`)

Avoid declaring duplicated interfaces inside page files. Instead, import from `@/types`:

```typescript
import type { ArticleItem, UserProfile, DjangoPost } from "@/types";
```

To add new types:
1. Create or open the relevant domain file in `src/types/<domain>.ts`.
2. Re-export it in `src/types/index.ts`.

---

## 🚀 Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000`. |
| `npx tsc --noEmit` | Runs full static TypeScript type-checking across all files. |
| `npm run build` | Builds the optimized production bundle. |
| `npm run lint` | Runs ESLint validation. |
