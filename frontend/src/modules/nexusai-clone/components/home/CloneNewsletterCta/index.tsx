/**
 * CloneNewsletterCta — "Stay ahead of the curve" newsletter sign-up section.
 * Email input with subscribe CTA and social proof.
 * Matches the newsletter section on nexusai-db.netlify.app.
 */
import React, { useState } from 'react';
import { Box, Typography, Stack, InputBase, Button } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

export default function CloneNewsletterCta() {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
    setEmail('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubscribe();
  };

  return (
    <Box
      component="section"
      sx={{
        mx:   'auto',
        mb:   '5rem',
        px:   '2rem',
      }}
    >
      <Box
        sx={{
          maxWidth:        720,
          mx:              'auto',
          textAlign:       'center',
          backgroundColor: CLONE_TOKENS.white,
          border:          `1px solid ${CLONE_TOKENS.border}`,
          borderRadius:    '24px',
          px:              { xs: '1.5rem', md: '3rem' },
          py:              { xs: '2.5rem', md: '3.5rem' },
          boxShadow:       '0 4px 24px rgba(28,26,22,0.07)',
        }}
      >
        {/* Eye-catch pill */}
        <Box
          sx={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '5px',
            px:              '0.85rem',
            py:              '5px',
            borderRadius:    '2rem',
            backgroundColor: CLONE_TOKENS.accentLight,
            border:          `1px solid ${CLONE_TOKENS.accent}30`,
            mb:              '1.25rem',
          }}
        >
          <Box
            sx={{
              width:           6,
              height:          6,
              borderRadius:    '50%',
              backgroundColor: CLONE_TOKENS.accent,
              flexShrink:      0,
            }}
          />
          <Typography
            sx={{
              fontSize:  '0.68rem',
              fontWeight: 700,
              color:     CLONE_TOKENS.accent,
              letterSpacing: '0.04em',
            }}
          >
            WEEKLY AI DIGEST
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          component="h2"
          sx={{
            fontFamily:    '"Syne", sans-serif',
            fontWeight:    700,
            fontSize:      'clamp(1.5rem, 3.5vw, 2rem)',
            letterSpacing: '-0.02em',
            color:         CLONE_TOKENS.text,
            mb:            '0.6rem',
          }}
        >
          Stay ahead of the curve
        </Typography>

        <Typography
          sx={{
            fontSize:  '0.88rem',
            fontWeight: 600,
            color:     CLONE_TOKENS.text2,
            mb:        '0.4rem',
          }}
        >
          New models drop every week. Don&apos;t miss a release.
        </Typography>

        <Typography
          sx={{
            fontSize:  '0.82rem',
            color:     CLONE_TOKENS.text3,
            maxWidth:  480,
            mx:        'auto',
            lineHeight: 1.7,
            mb:        '2rem',
          }}
        >
          Get a curated weekly digest: new model releases, benchmark comparisons,
          pricing changes, and prompt engineering tips — straight to your inbox.
        </Typography>

        {/* Email input + button */}
        {submitted ? (
          <Box
            sx={{
              py:              '1rem',
              px:              '1.5rem',
              borderRadius:    '12px',
              backgroundColor: '#E8F7EF',
              border:          `1px solid ${CLONE_TOKENS.teal}30`,
              display:         'inline-flex',
              alignItems:      'center',
              gap:             '8px',
            }}
          >
            <Typography sx={{ fontSize: '1.1rem' }}>🎉</Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: CLONE_TOKENS.teal }}>
              You&apos;re subscribed! Check your inbox for a confirmation.
            </Typography>
          </Box>
        ) : (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: 480, mx: 'auto' }}
          >
            <Box
              sx={{
                flex:            1,
                width:           { xs: '100%', sm: 'auto' },
                backgroundColor: CLONE_TOKENS.bg,
                border:          `1px solid ${CLONE_TOKENS.border}`,
                borderRadius:    '10px',
                px:              '0.85rem',
                py:              '0.65rem',
                display:         'flex',
                alignItems:      'center',
                transition:      'border-color 0.15s ease',
                '&:focus-within': { borderColor: CLONE_TOKENS.accent },
              }}
            >
              <InputBase
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="your@email.com"
                type="email"
                fullWidth
                sx={{
                  fontSize: '0.875rem',
                  color:    CLONE_TOKENS.text,
                  '& input::placeholder': { color: CLONE_TOKENS.text3, opacity: 1 },
                }}
              />
            </Box>
            <Button
              onClick={handleSubscribe}
              sx={{
                px:            '1.5rem',
                py:            '0.65rem',
                borderRadius:  '10px',
                fontWeight:    700,
                fontSize:      '0.875rem',
                background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:         '#fff',
                textTransform: 'none',
                whiteSpace:    'nowrap',
                flexShrink:    0,
                '&:hover': {
                  background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                },
              }}
            >
              Subscribe free →
            </Button>
          </Stack>
        )}

        {/* Fine print */}
        <Typography
          sx={{
            mt:        '1rem',
            fontSize:  '0.72rem',
            color:     CLONE_TOKENS.text3,
          }}
        >
          No spam. Unsubscribe any time. Trusted by 82K+ builders.
        </Typography>
      </Box>
    </Box>
  );
}
