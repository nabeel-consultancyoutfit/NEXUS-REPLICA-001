/**
 * CloneFooter — dark site footer.
 * Includes brand, quick links, navigation shortcuts, and auth CTAs.
 * Matches the footer on nexusai-db.netlify.app.
 */
import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

const FOOTER_LINKS = [
  { label: 'Models',   href: '/ai/marketplace' },
  { label: 'Research', href: '/ai/discover'    },
  { label: 'API',      href: '/ai/chat'        },
  { label: 'Privacy',  href: '/ai'             },
  { label: 'Terms',    href: '/ai'             },
];

const NAV_SHORTCUTS = [
  { icon: '💬', label: 'Chat Hub',    href: '/ai/chat'        },
  { icon: '🛍', label: 'Marketplace', href: '/ai/marketplace' },
  { icon: '🤖', label: 'Agents',      href: '/ai/agents'      },
  { icon: '🔬', label: 'Discover New', href: '/ai/discover'   },
];

const FOOTER_COLS = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse Models',       href: '/ai/marketplace' },
      { label: 'Compare Models',      href: '/ai/marketplace' },
      { label: 'AI Agent Builder',    href: '/ai/agents'      },
      { label: 'Prompt Engineering',  href: '/ai/chat'        },
      { label: 'Discover New',        href: '/ai/discover'    },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started',     href: '/ai/chat'        },
      { label: 'How-to Guides',       href: '/ai/chat'        },
      { label: 'Research Feed',       href: '/ai/discover'    },
      { label: 'API Documentation',   href: '/ai/chat'        },
      { label: 'Pricing Overview',    href: '/ai/marketplace' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About NexusAI',  href: '/ai' },
      { label: 'Blog',           href: '/ai' },
      { label: 'Privacy Policy', href: '/ai' },
      { label: 'Terms of Use',   href: '/ai' },
      { label: 'Contact',        href: '/ai' },
    ],
  },
];

export default function CloneFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: CLONE_TOKENS.text,
        color:           '#fff',
        pt:              '3.5rem',
        pb:              '2rem',
        px:              '2rem',
        mt:              'auto',
      }}
    >
      <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
        {/* Top: brand + columns + CTA */}
        <Grid container spacing={4} sx={{ mb: '2.5rem' }}>

          {/* Brand column */}
          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: '0.75rem' }}>
              <Box
                sx={{
                  width:        28,
                  height:       28,
                  borderRadius: '7px',
                  background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  flexShrink:   0,
                }}
              >
                <Box
                  sx={{
                    width:           10,
                    height:          10,
                    borderRadius:    '2px',
                    backgroundColor: 'rgba(255,255,255,0.85)',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily:  '"Syne", sans-serif',
                  fontWeight:  700,
                  fontSize:    '1rem',
                  color:       '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                NexusAI
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize:   '0.78rem',
                color:      'rgba(255,255,255,0.55)',
                lineHeight: 1.65,
                mb:         '1.25rem',
                maxWidth:   200,
              }}
            >
              The AI Model Marketplace. Find, compare, and deploy the right model for any task.
            </Typography>

            {/* Auth CTAs */}
            <Stack direction="row" spacing={1}>
              <Button
                component={NextLink}
                href="/signin"
                size="small"
                variant="outlined"
                sx={{
                  fontSize:      '0.75rem',
                  fontWeight:    600,
                  color:         'rgba(255,255,255,0.75)',
                  borderColor:   'rgba(255,255,255,0.2)',
                  borderRadius:  '2rem',
                  textTransform: 'none',
                  px:            1.25,
                  py:            '4px',
                  '&:hover': {
                    borderColor:     'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color:           '#fff',
                  },
                }}
              >
                Sign in
              </Button>
              <Button
                component={NextLink}
                href="/signup"
                size="small"
                sx={{
                  fontSize:      '0.75rem',
                  fontWeight:    700,
                  color:         '#fff',
                  background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                  borderRadius:  '2rem',
                  textTransform: 'none',
                  px:            1.5,
                  py:            '4px',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                  },
                }}
              >
                Try free →
              </Button>
            </Stack>
          </Grid>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <Grid key={col.title} item xs={6} sm={4} md={3}>
              <Typography
                sx={{
                  fontSize:      '0.7rem',
                  fontWeight:    700,
                  letterSpacing: '0.08em',
                  color:         'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  mb:            '0.85rem',
                }}
              >
                {col.title}
              </Typography>
              <Stack spacing={0.6}>
                {col.links.map(({ label, href }) => (
                  <Box
                    key={label}
                    component={NextLink}
                    href={href}
                    sx={{
                      fontSize:       '0.82rem',
                      color:          'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      transition:     'color 0.12s ease',
                      '&:hover':      { color: '#fff' },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.10)',
            pt:        '1.5rem',
            display:   'flex',
            flexWrap:  'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap:       '1rem',
          }}
        >
          {/* Copyright */}
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </Typography>

          {/* Quick nav shortcuts */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {NAV_SHORTCUTS.map(({ icon, label, href }) => (
              <Box
                key={label}
                component={NextLink}
                href={href}
                sx={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '4px',
                  fontSize:       '0.72rem',
                  color:          'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition:     'color 0.12s ease',
                  '&:hover':      { color: 'rgba(255,255,255,0.85)' },
                }}
              >
                <Typography sx={{ fontSize: '0.8rem' }}>{icon}</Typography>
                {label}
              </Box>
            ))}
          </Stack>

          {/* Footer links */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Box
                key={label}
                component={NextLink}
                href={href}
                sx={{
                  fontSize:       '0.72rem',
                  color:          'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition:     'color 0.12s ease',
                  '&:hover':      { color: 'rgba(255,255,255,0.75)' },
                }}
              >
                {label}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
