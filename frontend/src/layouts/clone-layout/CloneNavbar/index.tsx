/**
 * CloneNavbar — replicates the sticky top navigation bar from nexusai-db.netlify.app
 *
 * Structure:
 *   LEFT:   Orange square icon + "NexusAI" wordmark
 *   CENTER: Chat Hub | Marketplace | Agents | Discover New
 *   RIGHT:  Sign in (ghost) | Try free → (accent gradient)
 */
import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Stack, Typography, Button } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Chat Hub',      href: '/clone/chat'        },
  { label: 'Marketplace',   href: '/clone/marketplace' },
  { label: 'Agents',        href: '/clone/agents'      },
  { label: 'Discover New',  href: '/clone/discover'    },
];

export default function CloneNavbar() {
  const router = useRouter();

  return (
    <Box
      component="header"
      sx={{
        position:        'sticky',
        top:             0,
        zIndex:          1200,
        height:          `${CLONE_TOKENS.navbarHeight}px`,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        px:              '2rem',
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter:  'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom:    `1px solid ${CLONE_TOKENS.border}`,
      }}
    >
      {/* ── LEFT: Logo ─────────────────────────────────── */}
      <Box component={NextLink} href="/clone" sx={{ textDecoration: 'none' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
          {/* Orange square icon */}
          <Box
            sx={{
              width:        28,
              height:       28,
              borderRadius: '6px',
              background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
            }}
          >
            <Box
              sx={{
                width:        10,
                height:       10,
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.85)',
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily:  '"Syne", sans-serif',
              fontWeight:  700,
              fontSize:    '1rem',
              color:       CLONE_TOKENS.text,
              letterSpacing: '-0.01em',
            }}
          >
            NexusAI
          </Typography>
        </Stack>
      </Box>

      {/* ── CENTER: Nav links ───────────────────────────── */}
      <Stack direction="row" spacing={0.5} alignItems="center">
        {NAV_ITEMS.map(({ label, href }) => {
          const active = router.pathname === href || router.pathname.startsWith(href + '/');
          return (
            <Box key={href} component={NextLink} href={href} sx={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  px:              1.5,
                  py:              0.75,
                  borderRadius:    '8px',
                  cursor:          'pointer',
                  position:        'relative',
                  color:           active ? CLONE_TOKENS.accent : CLONE_TOKENS.text2,
                  fontFamily:      '"Instrument Sans", sans-serif',
                  fontWeight:      active ? 600 : 500,
                  fontSize:        '0.875rem',
                  transition:      'color 0.15s ease, background 0.15s ease',
                  '&:hover': {
                    color:           CLONE_TOKENS.text,
                    backgroundColor: CLONE_TOKENS.bg,
                  },
                  // Active underline
                  '&::after': active ? {
                    content:          '""',
                    position:         'absolute',
                    bottom:           -2,
                    left:             '50%',
                    transform:        'translateX(-50%)',
                    width:            '60%',
                    height:           2,
                    borderRadius:     1,
                    backgroundColor:  CLONE_TOKENS.accent,
                  } : {},
                }}
              >
                {label}
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* ── RIGHT: Auth buttons ─────────────────────────── */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Button
          variant="text"
          sx={{
            color:       CLONE_TOKENS.text2,
            fontWeight:  500,
            fontSize:    '0.875rem',
            px:          1.5,
            borderRadius: '2rem',
            '&:hover': {
              backgroundColor: CLONE_TOKENS.bg,
              color:           CLONE_TOKENS.text,
            },
          }}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          sx={{
            background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
            color:        '#fff',
            fontWeight:   600,
            fontSize:     '0.875rem',
            px:           1.75,
            py:           0.7,
            borderRadius: '2rem',
            '&:hover': {
              background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
            },
          }}
        >
          Try free →
        </Button>
      </Stack>
    </Box>
  );
}
