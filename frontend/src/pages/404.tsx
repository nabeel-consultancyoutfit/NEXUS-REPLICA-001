import type { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import NextLink from 'next/link';
import type { NextPageWithLayout } from './_app';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';
import { CLONE_TOKENS } from '@/theme/clone-theme';

function NotFoundContent() {
  return (
    <Box
      sx={{
        minHeight:      `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        backgroundColor: CLONE_TOKENS.bg,
        textAlign:      'center',
        px:             2,
      }}
    >
      <Typography
        sx={{
          fontFamily:  '"Syne", sans-serif',
          fontSize:    '6rem',
          fontWeight:  800,
          color:       CLONE_TOKENS.accent,
          lineHeight:  1,
          mb:          1,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, color: CLONE_TOKENS.text, mb: 1 }}
      >
        Page not found
      </Typography>
      <Typography sx={{ fontSize: '0.95rem', color: CLONE_TOKENS.text2, mb: 3 }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </Typography>
      <Box
        component={NextLink}
        href="/ai"
        sx={{
          display:         'inline-block',
          px:              3,
          py:              1.25,
          borderRadius:    '2rem',
          background:      `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
          color:           '#fff',
          fontWeight:      700,
          fontSize:        '0.9rem',
          fontFamily:      '"Instrument Sans", sans-serif',
          textDecoration:  'none',
          transition:      'background 0.15s ease',
          '&:hover': {
            background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
          },
        }}
      >
        ← Back to home
      </Box>
    </Box>
  );
}

const NotFound404Page: NextPageWithLayout = () => <NotFoundContent />;
NotFound404Page.getLayout = (page: ReactElement) => <ClonePageLayout>{page}</ClonePageLayout>;
export default NotFound404Page;
