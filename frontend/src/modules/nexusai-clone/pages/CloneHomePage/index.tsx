/**
 * CloneHomePage — replicates the landing / homepage of nexusai-db.netlify.app
 *
 * Layout:
 *   Navbar (via ClonePageLayout in Next.js page)
 *   Hero section: "347 models live" pill | large Syne heading | search CTA
 *   Stats bar
 *   Category grid: Create Image | Generate Audio | Create Video | …
 *   Featured models section
 *   Value props | AI Labs | Model Comparison | Trending Research
 *   Budget Finder | Use Case Grid | Newsletter CTA | Footer
 */
import React, { useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import {
  getStoredHomeLanguage,
  HOME_LANGUAGE_COPY,
  LANGUAGE_CHANGE_EVENT,
} from '../../i18n/homeLanguage';
import CloneHeroSearchCard from '../../components/CloneHeroSearchCard';
import CloneModelCard from '../../components/CloneModelCard';
import { CLONE_MOCK_MODELS } from '../../mock';
import CloneStatsBar from '../../components/home/CloneStatsBar';
import CloneValueProps from '../../components/home/CloneValueProps';
import CloneAiLabs from '../../components/home/CloneAiLabs';
import CloneModelComparison from '../../components/home/CloneModelComparison';
import CloneTrendingResearch from '../../components/home/CloneTrendingResearch';
import CloneBudgetFinder from '../../components/home/CloneBudgetFinder';
import CloneUseCaseGrid from '../../components/home/CloneUseCaseGrid';
import CloneNewsletterCta from '../../components/home/CloneNewsletterCta';
import CloneFooter from '../../components/home/CloneFooter';

const TASK_CATEGORIES = [
  { icon: '🖼️', promptLabel: 'Create Image' },
  { icon: '🎵', promptLabel: 'Generate Audio' },
  { icon: '🎬', promptLabel: 'Create Video' },
  { icon: '📐', promptLabel: 'Create Slides' },
  { icon: '📊', promptLabel: 'Create Infographs' },
  { icon: '❓', promptLabel: 'Create Quiz' },
  { icon: '📝', promptLabel: 'Create Document' },
  { icon: '🗺️', promptLabel: 'Create Mind Map' },
  { icon: '💻', promptLabel: 'Code' },
  { icon: '✍️', promptLabel: 'Write Content' },
  { icon: '🔍', promptLabel: 'Analyze Data' },
  { icon: '🔄', promptLabel: 'Automate Work' },
];

export default function CloneHomePage() {
  const router  = useRouter();
  const featured = CLONE_MOCK_MODELS.filter((m) => m.badge === 'hot').slice(0, 5);
  const [languageCode, setLanguageCode] = useState(getStoredHomeLanguage());

  useEffect(() => {
    const syncLanguage = () => setLanguageCode(getStoredHomeLanguage());
    window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
  }, []);

  const copy = HOME_LANGUAGE_COPY[languageCode];
  const taskCategories = useMemo(
    () => TASK_CATEGORIES.map((item, index) => ({ ...item, label: copy.tasks[index] ?? item.promptLabel })),
    [copy.tasks],
  );

  const handleSearchComplete = (prompt: string) => {
    router.push({ pathname: '/ai/chat', query: { prompt } });
  };

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
            {copy.home.liveModels}
          </Typography>
        </Box>

        {/* Main heading */}
        <Typography
          component="h1"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    600,
            fontSize:      'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         CLONE_TOKENS.text,
            mb:            '0.75rem',
          }}
        >
          {copy.home.headingBefore}{' '}
          <Box component="span" sx={{ color: CLONE_TOKENS.accent }}>{copy.home.headingAccent}</Box>
          {' '}{copy.home.headingAfter}
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
          {copy.home.subtitle}
        </Typography>

        {/* Hero guided-discovery search card */}
        <CloneHeroSearchCard onComplete={handleSearchComplete} />

        <Typography
          sx={{
            mt:        '1rem',
            fontSize:  '0.72rem',
            color:     CLONE_TOKENS.text3,
          }}
        >
          {copy.home.helperPrefix}{' '}
          <Box
            component={NextLink}
            href="/ai/chat"
            sx={{
              color:          CLONE_TOKENS.accent,
              fontWeight:     600,
              textDecoration: 'none',
              '&:hover':      { textDecoration: 'underline' },
            }}
          >
            {copy.home.helperLink}
          </Box>
        </Typography>
      </Box>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <CloneStatsBar />

      {/* ── Task Category Grid ───────────────────────────── */}
      <Box sx={{ maxWidth: 860, mx: 'auto', px: '2rem', mb: '4rem' }}>
        <Grid container spacing={1.5}>
          {taskCategories.map(({ icon, label, promptLabel }) => (
            <Grid key={label} item xs={6} sm={4} md={3} lg={2}>
              <Box
                onClick={() =>
                  router.push({ pathname: '/ai/chat', query: { prompt: `I want to: ${promptLabel}` } })
                }
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
            {copy.home.trendingModels}
          </Typography>
          <Box component={NextLink} href="/ai/marketplace" sx={{ textDecoration: 'none' }}>
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
              {copy.home.viewAllModels}
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

      {/* ── Value Props ──────────────────────────────────── */}
      <CloneValueProps />

      {/* ── AI Labs ──────────────────────────────────────── */}
      <CloneAiLabs />

      {/* ── Model Comparison Table ───────────────────────── */}
      <CloneModelComparison />

      {/* ── Trending Research ────────────────────────────── */}
      <CloneTrendingResearch />

      {/* ── Budget Finder ────────────────────────────────── */}
      <CloneBudgetFinder />

      {/* ── Use Case Grid ────────────────────────────────── */}
      <CloneUseCaseGrid />

      {/* ── Newsletter CTA ───────────────────────────────── */}
      <CloneNewsletterCta />

      {/* ── Footer ───────────────────────────────────────── */}
      <CloneFooter />

    </Box>
  );
}
