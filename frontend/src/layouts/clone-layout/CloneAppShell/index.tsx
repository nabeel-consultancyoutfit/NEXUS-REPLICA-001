/**
 * CloneAppShell — injects the clone theme and provides three layout variants:
 *
 *   ClonePageLayout    — Navbar only (homepage / landing)
 *   CloneMarketLayout  — Navbar + left filter rail (marketplace / discover)
 *   CloneAppLayout     — Navbar + left model sidebar + right panel (chat / agents)
 *
 * IMPORTANT: This shell must wrap every page in modules/nexusai.
 * It must NEVER be used inside the existing workspace app.
 */
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import cloneTheme, { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneNavbar from '@/layouts/clone-layout/CloneNavbar';
import CloneSidebar from '@/layouts/clone-layout/CloneSidebar';
import CloneRightPanel from '@/layouts/clone-layout/CloneRightPanel';

// ── Shared page scroll container ───────────────────────────────────────────
const ContentArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      flex:       1,
      minWidth:   0,
      minHeight:  `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
      overflowY:  'auto',
      overflowX:  'hidden',
      backgroundColor: CLONE_TOKENS.bg,
    }}
  >
    {children}
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. ClonePageLayout — Navbar only
// ─────────────────────────────────────────────────────────────────────────────
export interface ClonePageLayoutProps {
  children: React.ReactNode;
}

export function ClonePageLayout({ children }: ClonePageLayoutProps) {
  return (
    <ThemeProvider theme={cloneTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CloneNavbar />
        <Box sx={{ flex: 1, backgroundColor: CLONE_TOKENS.bg }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CloneMarketLayout — Navbar + left filter sidebar rail
//    The filter sidebar content is passed as a prop so each page can
//    render its own filter controls without layout coupling.
// ─────────────────────────────────────────────────────────────────────────────
export interface CloneMarketLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function CloneMarketLayout({ children, sidebar }: CloneMarketLayoutProps) {
  return (
    <ThemeProvider theme={cloneTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CloneNavbar />
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Left filter rail */}
          {sidebar && (
            <Box
              sx={{
                width:           225,
                flexShrink:      0,
                height:          `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
                position:        'sticky',
                top:             `${CLONE_TOKENS.navbarHeight}px`,
                overflowY:       'auto',
                overflowX:       'hidden',
                backgroundColor: CLONE_TOKENS.white,
                borderRight:     `1px solid ${CLONE_TOKENS.border}`,
                py:              2,
                px:              2,
                '&::-webkit-scrollbar':       { width: 4 },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: CLONE_TOKENS.bg3, borderRadius: 4 },
              }}
            >
              {sidebar}
            </Box>
          )}
          <ContentArea>{children}</ContentArea>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CloneAppLayout — Navbar + left model sidebar + right panel
//    Used for Chat Hub and Agents pages.
// ─────────────────────────────────────────────────────────────────────────────
export interface CloneAppLayoutProps {
  children: React.ReactNode;
  selectedModelId?: string;
  showActiveModel?: boolean;
  onSelectModel?: (id: string) => void;
}

export function CloneAppLayout({
  children,
  selectedModelId,
  showActiveModel = false,
  onSelectModel,
}: CloneAppLayoutProps) {
  return (
    <ThemeProvider theme={cloneTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CloneNavbar />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <CloneSidebar
            selectedModelId={selectedModelId}
            onSelectModel={onSelectModel}
          />
          <ContentArea>{children}</ContentArea>
          <CloneRightPanel selectedModelId={selectedModelId} showActiveModel={showActiveModel} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
