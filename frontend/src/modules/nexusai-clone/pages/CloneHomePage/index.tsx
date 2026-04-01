/**
 * CloneHomePage — replicates the landing / homepage of nexusai-db.netlify.app
 *
 * Layout:
 *   Navbar (via ClonePageLayout in Next.js page)
 *   Hero section: "347 models live" pill | large Syne heading | search CTA
 *   Category grid: Create Image | Generate Audio | Create Video | …
 *   Featured models section
 */
import React, { useState } from 'react';
import NextLink from 'next/link';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import CloneSearchBar from '../../components/CloneSearchBar';
import CloneModelCard from '../../components/CloneModelCard';
import { CLONE_MOCK_MODELS } from '../../mock';

const TASK_CATEGORIES = [
  { icon: '🖼️', label: 'Create Image'      },
  { icon: '🎵', label: 'Generate Audio'     },
  { icon: '🎬', label: 'Create Video'       },
  { icon: '📐', label: 'Create Slides'      },
  { icon: '📊', label: 'Create Infographs'  },
  { icon: '❓', label: 'Create Quiz'        },
  { icon: '📝', label: 'Create Document'    },
  { icon: '🗺️', label: 'Create Mind Map'   },
  { icon: '💻', label: 'Code'               },
  { icon: '✍️', label: 'Write Content'      },
  { icon: '🔍', label: 'Analyze Data'       },
  { icon: '🔄', label: 'Automate Work'      },
];

export default function CloneHomePage() {
  const [searchValue, setSearchValue] = useState('');
  const featured = CLONE_MOCK_MODELS.filter((m) => m.badge === 'hot').slice(0, 5);

  return (
    <Box sx={{ backgroundColor: CLONE_TOKENS.bg, minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        sx={{
          textAlign:   'center',
          pt:          '5rem',
          pb:          '3rem',
          px:          '2rem',
          maxWidth:    800,
          mx:          'auto',
        }}
      >
        {/* Live models pill */}
        <Box
          sx={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             0.75,
            px:              '14px',
            py:              '6px',
            borderRadius:    '2rem',
            border:          `1px solid ${CLONE_TOKENS.border}`,
            backgroundColor: CLONE_TOKENS.white,
            mb:              '2.5rem',
          }}
        >
          <Box
            sx={{
              width:           8,
              height:          8,
              borderRadius:    '50%',
              backgroundColor: CLONE_TOKENS.green,
              flexShrink:      0,
            }}
          />
          <Typography sx={{ fontSize: '0.8rem', color: CLONE_TOKENS.text2, fontWeight: 500 }}>
            347 models live · Updated daily
          </Typography>
        </Box>

        {/* Main heading */}
        <Typography
          component="h1"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    800,
            fontSize:      'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         CLONE_TOKENS.text,
            mb:            '0.75rem',
          }}
        >
          Find your perfect{' '}
          <Box component="span" sx={{ color: CLONE_TOKENS.accent }}>AI model</Box>
          {' '}with guided discovery
        </Typography>

        <Typography
          sx={{
            fontSize:   '1rem',
            color:      CLONE_TOKENS.text2,
            lineHeight: 1.65,
            mb:         '2.5rem',
            maxWidth:   520,
            mx:         'auto',
          }}
        >
          You don&apos;t need to know anything about AI to get started.
          Just click the box below — we&apos;ll do the rest together. ✨
        </Typography>

        {/* Search + CTA */}
        <Box
          sx={{
            maxWidth:        600,
            mx:              'auto',
            display:         'flex',
            gap:             1,
            alignItems:      'center',
            backgroundColor: CLONE_TOKENS.white,
            border:          `1px solid ${CLONE_TOKENS.border}`,
            borderRadius:    '16px',
            px:              1.5,
            py:              0.75,
            boxShadow:       `0 4px 20px rgba(28,26,22,0.08)`,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CloneSearchBar
              placeholder="Click here and type anything — or just say hi"
              value={searchValue}
              onChange={setSearchValue}
            />
          </Box>
          <Box component={NextLink} href="/clone/marketplace" sx={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:        '#fff',
                fontWeight:   700,
                px:           2.5,
                py:           1.1,
                borderRadius: '12px',
                whiteSpace:   'nowrap',
                fontSize:     '0.875rem',
                '&:hover': {
                  background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                },
              }}
            >
              🔍 Let&apos;s go
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Task Category Grid ───────────────────────────── */}
      <Box sx={{ maxWidth: 860, mx: 'auto', px: '2rem', mb: '4rem' }}>
        <Grid container spacing={1.5}>
          {TASK_CATEGORIES.map(({ icon, label }) => (
            <Grid key={label} item xs={6} sm={4} md={3} lg={2}>
              <Box
                sx={{
                  display:         'flex',
                  flexDirection:   'column',
                  alignItems:      'center',
                  gap:             0.75,
                  py:              1.75,
                  px:              1,
                  borderRadius:    '12px',
                  border:          `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  cursor:          'pointer',
                  transition:      'all 0.15s ease',
                  '&:hover': {
                    borderColor:     CLONE_TOKENS.accent,
                    backgroundColor: CLONE_TOKENS.accentLight,
                    transform:       'translateY(-2px)',
                    boxShadow:       `0 4px 12px rgba(200,98,42,0.12)`,
                  },
                }}
              >
                <Box sx={{ fontSize: '1.5rem' }}>{icon}</Box>
                <Typography
                  sx={{
                    fontSize:  '0.75rem',
                    fontWeight: 600,
                    color:     CLONE_TOKENS.text2,
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── Featured (Hot) Models ────────────────────────── */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: '2rem', pb: '5rem' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily:    '"Syne", sans-serif',
              fontWeight:    700,
              color:         CLONE_TOKENS.text,
              letterSpacing: '-0.02em',
            }}
          >
            🔥 Trending Models
          </Typography>
          <Box component={NextLink} href="/clone/marketplace" sx={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              sx={{
                color:    CLONE_TOKENS.accent,
                fontSize: '0.875rem',
                fontWeight: 600,
                px:       0,
                '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
              }}
            >
              View all 347 models →
            </Button>
          </Box>
        </Stack>
        <Grid container spacing={2}>
          {featured.map((model) => (
            <Grid key={model.id} item xs={12} sm={6} md={4} lg={2.4}>
              <CloneModelCard model={model} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
