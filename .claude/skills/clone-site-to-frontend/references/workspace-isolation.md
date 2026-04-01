# Workspace Isolation Rules for Site Cloning

This document defines the mandatory isolation architecture for all cloned sites.
Any deviation from these rules produces an INVALID clone.

---

## Why Isolation Is Required

The existing workspace application (`frontend/src/`) has its own:
- Theme: `#38CAB5` teal palette + Plus Jakarta Sans font
- Layout: `MainLayout` with 240px sidebar + 64px header
- Auth flow: `AuthGuard`, `AuthContext`, JWT tokens

A cloned site has completely different visual identity, layout structure, and auth model.
Reusing the workspace layout/theme would:
1. Produce visually incorrect output (wrong colors, wrong fonts, wrong layout)
2. Mix the clone with the production app (breaking changes risk)
3. Require AuthGuard login to see the clone (defeating the purpose)

---

## Isolation Architecture

```
frontend/src/
│
├── theme/
│   ├── [existing workspace theme]      ← DO NOT TOUCH
│   └── clone-theme/
│       └── index.ts                    ← New theme from reference site
│
├── layouts/
│   ├── [existing: layout/ with MainLayout, Header, NavLinks]  ← DO NOT TOUCH
│   └── clone-layout/
│       ├── CloneNavbar/index.tsx       ← Reference site top navigation
│       ├── CloneSidebar/index.tsx      ← Reference site sidebar (if any)
│       ├── CloneRightPanel/index.tsx   ← Reference site right panel (if any)
│       └── CloneAppShell/index.tsx     ← Layout variants with ThemeProvider
│
├── modules/
│   └── [site-name]-clone/             ← All clone-specific code lives here
│       ├── types/index.ts
│       ├── mock/index.ts
│       ├── components/
│       │   └── Clone<Name>/index.tsx  ← All prefixed with "Clone"
│       └── pages/
│           └── Clone<Name>Page/index.tsx
│
└── pages/
    ├── [existing: dashboard/, login/, etc.]  ← DO NOT TOUCH
    └── clone/                                ← Routing bridge
        ├── index.tsx                         ← Landing page
        ├── marketplace.tsx
        ├── chat.tsx
        ├── discover.tsx
        └── agents.tsx
```

---

## Prohibited Imports in Clone Files

The following imports are FORBIDDEN inside any file under:
- `theme/clone-theme/`
- `layouts/clone-layout/`
- `modules/[name]-clone/`
- `pages/clone/`

```typescript
// ❌ FORBIDDEN — uses workspace layout
import MainLayout from '@/layout/MainLayout';
import Header from '@/layout/Header';
import NavLinks from '@/layout/NavLinks';
import PlainLayout from '@/layout/PlainLayout';

// ❌ FORBIDDEN — uses workspace theme
import theme from '@/theme';
import { palette } from '@/theme/palette';
import { typography } from '@/theme/typography';

// ❌ FORBIDDEN — uses workspace auth
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import GuestGuard from '@/GuardsAndPermissions/GuestGuard';
import { useAuthContext } from '@/contexts/AuthContext';

// ❌ FORBIDDEN — uses workspace components that have workspace theme baked in
import PageHeader from '@/components/PageHeader';
```

```typescript
// ✅ ALLOWED — clone-specific files
import cloneTheme, { CLONE_TOKENS } from '@/theme/clone-theme';
import { ClonePageLayout, CloneAppLayout } from '@/layouts/clone-layout/CloneAppShell';
import CloneModelCard from '@/modules/nexusai-clone/components/CloneModelCard';

// ✅ ALLOWED — generic MUI + React
import { Box, Typography, Stack } from '@mui/material';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
```

---

## CloneAppShell — How to Use It

Every `pages/clone/` page must use one of the three layout variants.
The variant chosen must match the reference site's layout for that page.

### Variant 1: ClonePageLayout
Use for: landing / homepage / discover (no sidebars)

```typescript
// pages/clone/index.tsx
const Page: NextPageWithLayout = () => <CloneHomePage />;
Page.getLayout = (page: ReactElement) => <ClonePageLayout>{page}</ClonePageLayout>;
```

### Variant 2: CloneMarketLayout
Use for: pages with a LEFT filter rail (marketplace, search results)

```typescript
// pages/clone/marketplace.tsx
function Wrapper() {
  const [filters, setFilters] = useState({ ... });
  return (
    <CloneMarketLayout sidebar={<CloneFilterRail filters={filters} setFilters={setFilters} />}>
      <CloneMarketplacePage filters={filters} />
    </CloneMarketLayout>
  );
}
const Page: NextPageWithLayout = () => <Wrapper />;
Page.getLayout = (page: ReactElement) => page; // layout is self-contained
```

### Variant 3: CloneAppLayout
Use for: pages with LEFT model list sidebar + RIGHT panel (chat, agents)

```typescript
// pages/clone/chat.tsx
function Wrapper() {
  const [modelId, setModelId] = useState('gpt-5');
  return (
    <CloneAppLayout selectedModelId={modelId} onSelectModel={setModelId}>
      <CloneChatPage selectedModelId={modelId} />
    </CloneAppLayout>
  );
}
const Page: NextPageWithLayout = () => <Wrapper />;
Page.getLayout = (page: ReactElement) => page;
```

---

## Clone Theme — Rules

All styling inside clone files must use `CLONE_TOKENS`:

```typescript
// ✅ Correct — uses extracted tokens
import { CLONE_TOKENS } from '@/theme/clone-theme';

<Box sx={{ backgroundColor: CLONE_TOKENS.bg, color: CLONE_TOKENS.text }}>

// ❌ Wrong — hardcoded hex
<Box sx={{ backgroundColor: '#F4F2EE', color: '#1C1A16' }}>

// ❌ Wrong — uses workspace theme palette
<Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
// (This would resolve to the workspace teal theme, not the clone theme)
```

---

## Isolation Verification Checklist

Run these checks on every generated file before declaring the clone complete:

| Check | How to verify |
|---|---|
| No MainLayout import | `grep -r "from '@/layout" modules/` and `layouts/clone-layout/` — should find nothing |
| No workspace theme import | `grep -r "from '@/theme'" modules/` — should find nothing (only `@/theme/clone-theme` is ok) |
| No AuthGuard | `grep -r "AuthGuard" pages/clone/` — should find nothing |
| No `style={}` | `grep -r "style={{" modules/ layouts/clone-layout/ pages/clone/` — should find nothing |
| No hardcoded hex in sx | Manual review of any `#` inside `sx={{` |
| Routing under /clone | All `pages/clone/` files, no clone pages elsewhere |
| Theme wrapped | Every `pages/clone/` layout variant calls `<ThemeProvider theme={cloneTheme}>` |
