---
name: clone-site-to-frontend
description: >
  Deep-clones any live website into a fully functional, visually faithful frontend
  implementation inside the workspace's frontend/ directory — using an ISOLATED module
  that does NOT touch or reuse the existing application layout or theme. ALWAYS use
  this skill when the user says things like: "clone this site", "replicate this website",
  "analyze and build this site", "crawl and generate this page", "build a frontend from
  this URL", "generate all pages from this website", "I want to recreate X website", or
  pastes a URL and asks to generate frontend code from it. Also triggers when the user
  says "site analysis + code generation", "website to code", or "scrape and build".
  The skill handles the ENTIRE pipeline:
  crawl → screenshot → theme extract → analyze → plan → codegen (isolated module).
---

# Clone Site to Frontend

You are performing a deep website clone operation. Your job is to analyze a live website
completely — its exact layout structure, color system, typography, and navigation — and
generate a full frontend implementation that faithfully replicates it.

## ⚠️ CRITICAL: Isolation Rule (read this first)

The clone implementation MUST be placed in an **isolated module** that is completely
separate from the existing application. You must:

1. **NEVER import from `@/layout/MainLayout`** — you must build a new layout
2. **NEVER import from `@/theme`** — you must extract and recreate the reference theme
3. **NEVER use `@/components/PageHeader`** — build clone-specific components
4. **NEVER wrap pages in `<AuthGuard>`** — the clone is a standalone UI

The isolated structure is:
```
frontend/src/
├── theme/
│   └── clone-theme/index.ts          ← NEW theme from reference site
├── layouts/
│   └── clone-layout/
│       ├── CloneNavbar/index.tsx      ← Reference site top nav
│       ├── CloneSidebar/index.tsx     ← Reference site sidebar (if any)
│       ├── CloneRightPanel/index.tsx  ← Reference site right panel (if any)
│       └── CloneAppShell/index.tsx    ← ThemeProvider + layout variants
└── modules/
    └── [site-name]-clone/
        ├── types/index.ts
        ├── mock/index.ts
        ├── components/
        │   └── Clone<ComponentName>/
        └── pages/
            └── Clone<PageName>/
```

The routing bridge lives under `pages/clone/` (no AuthGuard, no MainLayout):
```
frontend/src/pages/clone/
├── index.tsx        ← landing page
├── marketplace.tsx  ← marketplace/browse
├── chat.tsx         ← chat
└── ...
```

Read `references/workspace-isolation.md` AND `references/workspace-stack.md` before writing code.

---

## The URL to clone

If the user provided a URL, use it. If not, ask: "What website URL should I clone?"

---

## Phase 1 — Discovery (Crawl the full site)

Start by navigating to the root URL. Your goal is to discover EVERY reachable page.

### Step 1A: Crawl the navigation structure

For SPAs (React, Vue, etc.) that use client-side routing:
1. Navigate to the root URL
2. DO NOT try to load `/page-name` directly — it will 404 in most SPAs
3. Extract links from `a[href]`, nav items, sidebar links, and any router link patterns
4. Click navigation items to trigger client-side routing to each page
5. For hash-based SPAs (`/#/page`), extract routes from `href="#/..."` and `data-route` attributes

Use `javascript_tool` to extract all hrefs:
```js
Array.from(document.querySelectorAll('a[href], [data-route], [href]'))
  .map(el => el.href || el.getAttribute('data-route') || el.getAttribute('href'))
  .filter(Boolean)
  .filter(href => href.includes(window.location.hostname) || href.startsWith('/') || href.startsWith('#'))
  .filter((v, i, a) => a.indexOf(v) === i)
```

If the site is a SPA and direct URL navigation returns 404:
- Stay on the homepage URL
- Click each navigation link to navigate
- Screenshot each navigation state

### Step 1B: Output — Sitemap

Produce a complete sitemap before proceeding. Format:

```
SITEMAP
────────────────────────────────────────────
/                    Homepage / Landing
/chat                Chat Hub (SPA state)
/marketplace         Marketplace browse
/agents              Agents
/discover            Discover / Research feed
/model/[id]          Model detail (dynamic)
────────────────────────────────────────────
Total pages discovered: N
SPA routing: yes/no
Dynamic route templates: N
```

---

## Phase 2 — Screenshot + Theme Extraction

### Step 2A: Screenshot every page

For each page, capture a full-page screenshot. Note for each:
- **Layout type**: top-nav only | sidebar+content | sidebar+content+right-panel | centered-card | split-panel
- **Key sections**: exact positions of header, sidebar, content area, footer, right panels
- **Sidebar structure**: if sidebar exists — width, background, items (icons+labels)
- **Right panel structure**: if right panel exists — width, sections, content type

### Step 2B: ⚠️ Extract the COMPLETE theme system

This is mandatory — you must produce a full theme extraction before coding.

```
THEME EXTRACTION
────────────────────────────────────────────────────────────
COLORS
  Primary/Accent:   #XXXXXX
  Accent Dark:      #XXXXXX
  Accent Light:     #XXXXXX (tint/hover bg)
  Background:       #XXXXXX
  Background 2:     #XXXXXX (section bg)
  Paper/Card:       #XXXXXX
  Text Primary:     #XXXXXX
  Text Secondary:   #XXXXXX
  Text Disabled:    #XXXXXX
  Border:           #XXXXXX
  Success:          #XXXXXX  Error: #XXXXXX  Warning: #XXXXXX  Info: #XXXXXX

TYPOGRAPHY
  Heading font:     "Font Name" (Google Fonts family or system)
  Body font:        "Font Name"
  Monospace:        "Font Name" (if present)
  Heading weight:   700 / 800
  Base size:        16px / 14px

SHAPE
  Border radius default: Xpx
  Border radius small:   Xpx
  Border radius large:   Xpx
  Border radius pill:    Xrem / 999px

SHADOWS
  Light:   0 Xpx Xpx rgba(...)
  Medium:  0 Xpx Xpx rgba(...)
  Large:   0 Xpx Xpx rgba(...)

SPACING / LAYOUT
  Navbar height:    Xpx
  Sidebar width:    Xpx  (if exists)
  Right panel width: Xpx (if exists)
  Card padding:     Xrem
  Section padding:  Xrem
────────────────────────────────────────────────────────────
```

Do NOT proceed to Phase 3 until you have extracted every value above.

---

## Phase 3 — Feature & Component Extraction

For each page, extract a structured inventory:

```
PAGE: /marketplace
────────────────────────────────────────────
Purpose:        Browse and discover AI models
Layout type:    Navbar + left filter panel + content grid
Auth required:  No

LAYOUT STRUCTURE
  Navbar:       logo left | nav center | auth buttons right
  Left panel:   ~200px, filter checkboxes + sliders + rating selector
  Content:      top bar (title + search + category chips) + lab tabs + card grid

UI Components:
  CloneSearchBar        accent focus ring, rounded
  CloneCategoryChip     pill chips (All, Language, Vision...)
  CloneModelCard        icon + name + provider + badge + description + tags + rating + price
  CloneBadge            hot/new/open/beta color-coded inline badge
  LabFilterTabs         scrollable horizontal provider tabs

Interactions:
  - Search filters model grid in real-time
  - Category chip selects active capability filter
  - Provider/pricing/rating filters in left panel narrow results

Data displayed:
  - Model: name, provider, icon, description, capability tags, rating, review count, price
  - Badges: hot / new / open / beta
```

Repeat for every discovered page.

---

## Phase 4 — Component Architecture

Identify shared vs page-specific components. ALL component names must be prefixed with
`Clone` to avoid collisions with the existing workspace application.

```
SHARED CLONE COMPONENTS
────────────────────────────────────────────────
CloneBadge           All model-display pages
CloneModelCard       Marketplace, Home, Chat sidebar
CloneCategoryChip    Marketplace, Discover, Agents
CloneSearchBar       Marketplace, Chat sidebar, Discover
CloneChatBubble      Chat Hub only
...

PAGE-SPECIFIC COMPONENTS
────────────────────────────────────────────────
(page-specific ones live inside modules/[site-clone]/pages/ClonePage*/index.tsx)
```

---

## Phase 5 — Implementation Architecture Plan

**MANDATORY: produce this plan in full before writing any code.**

Map the discovered theme + layout + pages to the correct isolated structure.

```
IMPLEMENTATION PLAN — ISOLATED MODULE
══════════════════════════════════════════════════════════════

PART A — Theme (new file, does NOT extend existing workspace theme)
  frontend/src/theme/clone-theme/index.ts
    - CLONE_TOKENS constant (all extracted values)
    - MUI createTheme() with extracted palette, typography, shadows, shape, overrides
    - @import Google Fonts in MuiCssBaseline styleOverrides

PART B — Layout System (new, does NOT reuse MainLayout)
  frontend/src/layouts/clone-layout/
  ├── CloneNavbar/index.tsx       exact nav replication
  ├── CloneSidebar/index.tsx      exact sidebar replication (if site has one)
  ├── CloneRightPanel/index.tsx   exact right panel (if site has one)
  └── CloneAppShell/index.tsx     layout variants:
        ClonePageLayout    — navbar only (landing, discover)
        CloneMarketLayout  — navbar + left filter rail
        CloneAppLayout     — navbar + sidebar + right panel

PART C — Isolated Module
  frontend/src/modules/[site-name]-clone/
  ├── types/index.ts              typed interfaces for all data entities
  ├── mock/index.ts               realistic mock data (20+ items)
  ├── components/
  │   ├── CloneBadge/
  │   ├── CloneCategoryChip/
  │   ├── CloneSearchBar/
  │   ├── CloneModelCard/
  │   └── Clone<X>/               (one per shared component)
  └── pages/
      ├── CloneHomePage/
      ├── CloneMarketplacePage/
      ├── CloneChatPage/
      └── Clone<X>Page/           (one per discovered page)

PART D — Routing Bridge (no AuthGuard, no MainLayout, no workspace theme)
  frontend/src/pages/clone/
  ├── index.tsx           → CloneHomePage in ClonePageLayout
  ├── marketplace.tsx     → CloneMarketplacePage in CloneMarketLayout
  ├── chat.tsx            → CloneChatPage in CloneAppLayout
  └── ...

FILES TO CREATE: N
FILES UNCHANGED: all existing workspace files (dashboard, login, layout/, theme/)
══════════════════════════════════════════════════════════════
```

Wait for user APPROVAL before proceeding to Phase 6.

---

## Phase 6 — Code Generation

Generate all files in this strict order (each depends on the previous):

### 6.1 — Clone Theme (`frontend/src/theme/clone-theme/index.ts`)

```typescript
// REQUIRED structure — fill in extracted values
import { createTheme } from '@mui/material/styles';

export const CLONE_TOKENS = {
  accent:        '#XXXXXX',   // primary accent color from reference site
  accentDark:    '#XXXXXX',
  accentLight:   '#XXXXXX',  // 10% tint for hover/active bg
  bg:            '#XXXXXX',  // page background
  bg2:           '#XXXXXX',  // section background
  white:         '#FFFFFF',
  text:          '#XXXXXX',  // primary text
  text2:         '#XXXXXX',  // secondary text
  text3:         '#XXXXXX',  // disabled / hint text
  border:        '#XXXXXX',
  // ... status colors, semantic colors
  navbarHeight:  XX,         // in px
  sidebarWidth:  XX,         // in px (0 if no sidebar)
  rightPanelWidth: XX,       // in px (0 if no right panel)
} as const;

const cloneTheme = createTheme({
  palette: {
    primary: { main: CLONE_TOKENS.accent, dark: CLONE_TOKENS.accentDark, light: CLONE_TOKENS.accentLight },
    background: { default: CLONE_TOKENS.bg, paper: CLONE_TOKENS.white },
    text: { primary: CLONE_TOKENS.text, secondary: CLONE_TOKENS.text2 },
    divider: CLONE_TOKENS.border,
    // ... extracted semantic colors
  },
  typography: {
    fontFamily: '"[Body Font]", sans-serif',
    h1: { fontFamily: '"[Heading Font]", sans-serif', fontWeight: 700 },
    // ...
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: XX },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=[Font]+...');
      `,
    },
    MuiButton: { /* match reference site button shape */ },
    MuiCard: { /* match reference site card style */ },
    // ...
  },
});

export default cloneTheme;
```

### 6.2 — Clone Layout

Build each layout component using ONLY `CLONE_TOKENS` from step 6.1.
Never reference `theme.palette.primary.main` — use `CLONE_TOKENS.accent` directly.

**CloneNavbar** must replicate:
- Exact logo structure (icon + wordmark)
- Exact nav links (same labels, same order as reference site)
- Exact right-side buttons

**CloneSidebar** (if reference site has a sidebar) must replicate:
- Exact width from `CLONE_TOKENS.sidebarWidth`
- Exact item structure (icon + label + status indicator)
- Exact search field style

**CloneAppShell** must provide three variants:
- `ClonePageLayout` — Navbar only
- `CloneMarketLayout` — Navbar + left filter rail (sidebar content passed as prop)
- `CloneAppLayout` — Navbar + CloneSidebar + CloneRightPanel

Each variant wraps children with `<ThemeProvider theme={cloneTheme}><CssBaseline />`.

### 6.3 — Module Types

```typescript
// frontend/src/modules/[site-name]-clone/types/index.ts
export interface CloneModel { ... }
export type CloneModelBadge = 'hot' | 'new' | 'open' | 'beta' | null;
// ... all entities for the cloned site
```

### 6.4 — Mock Data

Generate at least 15–20 realistic entries per entity, using data visible on the
reference site (model names, providers, descriptions actually shown).

### 6.5 — Clone Components

One directory per component inside `modules/[site-name]-clone/components/`.
Each component:
- Imports ONLY from `@/theme/clone-theme` for colors (never `theme.palette.*`)
- Uses `sx` for ALL styling — never `style={{}}`
- Accepts typed props with a `Props` interface
- Uses MUI components as building blocks

### 6.6 — Clone Pages

One directory per page inside `modules/[site-name]-clone/pages/`.
Pages:
- Import layout variants from `@/layouts/clone-layout/CloneAppShell`
- Use CloneComponents for all UI elements
- Do NOT import AuthGuard, PageHeader, MainLayout

### 6.7 — Routing Bridge

```typescript
// frontend/src/pages/clone/marketplace.tsx
import type { NextPageWithLayout } from '../_app';
import { CloneMarketLayout } from '@/layouts/clone-layout/CloneAppShell';
import CloneMarketplacePage from '@/modules/[site-name]-clone/pages/CloneMarketplacePage';

function Wrapper() {
  return (
    <CloneMarketLayout sidebar={<...sidebar content...>}>
      <CloneMarketplacePage />
    </CloneMarketLayout>
  );
}

const Page: NextPageWithLayout = () => <Wrapper />;
Page.getLayout = (page) => page; // layout is self-contained in the wrapper
export default Page;
```

---

## Unbreakable Code Generation Rules

1. **`sx` only** — never `style={{}}`, never `style` prop on any element
2. **`@/` alias always** — never relative paths (`../../`)
3. **CLONE_TOKENS for all colors** — never `theme.palette.*`, never hardcoded hex values in `sx`
4. **`CloneAppShell` for all layouts** — NEVER `MainLayout`, NEVER `AuthGuard`
5. **Clone theme only** — NEVER import from `@/theme` in clone files
6. **Prefix all components with `Clone`** — prevents namespace collisions
7. **20+ mock entries** — every list page must have enough mock data to show layout intent
8. **EmptyState component** in every list/grid for zero-results case
9. **Loading skeletons** for every async data section
10. **NEVER modify existing workspace files** — dashboard, login, layout/, theme/ stay untouched
11. **Routing bridge under `pages/clone/`** — never place clone pages elsewhere in `pages/`
12. **All `pages/clone/` files set `getLayout = (page) => page`** — the layout ThemeProvider is self-contained

Violations of rules 4, 5, 10 are critical failures that invalidate the clone.

---

## Phase 7 — Completion Report + Isolation Verification

After generating all files:

1. **Self-verify isolation** — scan every created file for:
   - Any `import ... from '@/layout/MainLayout'` → FAIL
   - Any `import ... from '@/theme'` (without `/clone-theme`) → FAIL
   - Any `style={{` → FAIL
   - Any hardcoded hex color inside `sx` → FAIL

2. Output the report:

```
═══════════════════════════════════════════════════════
CLONE COMPLETE
───────────────────────────────────────────────────────
Site analyzed:       [URL]
Pages cloned:        N (list each route)
Components built:    N shared + N page-specific
Layout variants:     ClonePageLayout / CloneMarketLayout / CloneAppLayout
Theme file:          frontend/src/theme/clone-theme/index.ts
                     Primary: #XXXXXX | Font: [name] | Radius: Xpx
───────────────────────────────────────────────────────
ISOLATION CHECK:
  ✅ No imports from @/layout/MainLayout
  ✅ No imports from @/theme (workspace)
  ✅ No style={{}} violations
  ✅ No hardcoded hex colors in sx
  ✅ All pages under pages/clone/
───────────────────────────────────────────────────────
ROUTES AVAILABLE:
  /clone              Landing / Homepage
  /clone/marketplace  Model marketplace
  /clone/chat         Chat Hub
  /clone/agents       Agents
  /clone/discover     Discover New
───────────────────────────────────────────────────────
FILES CREATED:
  theme/clone-theme/index.ts
  layouts/clone-layout/...    (layout system)
  modules/[name]-clone/...    (components + pages)
  pages/clone/...             (routing bridge)
───────────────────────────────────────────────────────
EXISTING APP UNTOUCHED:
  frontend/src/pages/dashboard/   ✅ unchanged
  frontend/src/pages/login/       ✅ unchanged
  frontend/src/layout/            ✅ unchanged
  frontend/src/theme/ (original)  ✅ unchanged
═══════════════════════════════════════════════════════
```

---

## Reference files

- **`references/workspace-stack.md`** — workspace TypeScript/MUI/Next.js conventions
- **`references/workspace-isolation.md`** — isolation rules and module structure (REQUIRED)
- **`references/component-map.md`** — website UI patterns → MUI component mapping
