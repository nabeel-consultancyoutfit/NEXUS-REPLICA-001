/**
 * Route: /signin
 *
 * Sign In page — matches the NexusAI Clone visual theme.
 * Calls POST /api/auth/login via RTK Query, stores the token in
 * AuthContext + Redux + localStorage, then redirects to /ai.
 *
 * The entire application remains accessible without signing in.
 */
import React, { ReactElement, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import VisibilityOutlinedIcon     from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon  from '@mui/icons-material/VisibilityOffOutlined';
import type { NextPageWithLayout } from '../_app';
import { ClonePageLayout } from '@/layouts/clone-layout/CloneAppShell';
import { useLoginMutation } from '@/services/auth';
import { useAuthContext } from '@/contexts/AuthContext';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { extractErrorMessage } from '@/types/shared';

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = yup.object({
  email:    yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormValues = yup.InferType<typeof schema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

function SignInPage() {
  const router            = useRouter();
  const { login }         = useAuthContext();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setApiError('');
    try {
      const response = await loginMutation({
        email:    values.email,
        password: values.password,
      }).unwrap();

      // Persist token + update context
      login(response.accessToken, response.user);

      // Redirect — honour ?from= redirect param if present
      const from = typeof router.query.from === 'string' ? router.query.from : '/ai';
      router.push(from);
    } catch (err: unknown) {
      setApiError(extractErrorMessage(err));
    }
  };

  return (
    <Box
      sx={{
        minHeight:       `calc(100vh - ${CLONE_TOKENS.navbarHeight}px)`,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: CLONE_TOKENS.bg,
        px:              2,
        py:              4,
      }}
    >
      <Box
        sx={{
          width:           '100%',
          maxWidth:        420,
          backgroundColor: CLONE_TOKENS.white,
          borderRadius:    '24px',
          border:          `1px solid ${CLONE_TOKENS.border}`,
          boxShadow:       '0 8px 32px rgba(28,26,22,0.10)',
          p:               { xs: 3, sm: 4 },
        }}
      >
        {/* ── Header ────────────────────────────────────────── */}
        <Stack alignItems="center" spacing={0.75} sx={{ mb: 3.5 }}>
          {/* Logo mark */}
          <Box
            sx={{
              width:           36,
              height:          36,
              borderRadius:    '9px',
              background:      `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              mb:              0.5,
            }}
          >
            <Box
              sx={{
                width:           12,
                height:          12,
                borderRadius:    '3px',
                backgroundColor: 'rgba(255,255,255,0.85)',
              }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily:    '"Syne", sans-serif',
              fontWeight:    700,
              fontSize:      '1.35rem',
              color:         CLONE_TOKENS.text,
              letterSpacing: '-0.01em',
            }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: CLONE_TOKENS.text3 }}>
            Sign in to your NexusAI account
          </Typography>
        </Stack>

        {/* ── API error ─────────────────────────────────────── */}
        {apiError && (
          <Alert
            severity="error"
            sx={{
              mb:           2,
              borderRadius: '10px',
              fontSize:     '0.8rem',
            }}
          >
            {apiError}
          </Alert>
        )}

        {/* ── Form ──────────────────────────────────────────── */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      fontSize:     '0.875rem',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: CLONE_TOKENS.accent,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: CLONE_TOKENS.accent,
                    },
                  }}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          size="small"
                          sx={{ color: CLONE_TOKENS.text3 }}
                        >
                          {showPassword
                            ? <VisibilityOffOutlinedIcon sx={{ fontSize: '1.1rem' }} />
                            : <VisibilityOutlinedIcon    sx={{ fontSize: '1.1rem' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      fontSize:     '0.875rem',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: CLONE_TOKENS.accent,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: CLONE_TOKENS.accent,
                    },
                  }}
                />
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{
                mt:           0.5,
                py:           1.2,
                borderRadius: '10px',
                fontSize:     '0.9rem',
                fontWeight:   700,
                background:   `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:        '#fff',
                textTransform: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, ${CLONE_TOKENS.accentDark} 0%, #8A3D10 100%)`,
                },
                '&.Mui-disabled': {
                  background: CLONE_TOKENS.bg2,
                  color:      CLONE_TOKENS.text3,
                },
              }}
            >
              {isLoading
                ? <CircularProgress size={20} sx={{ color: CLONE_TOKENS.text3 }} />
                : 'Sign in'}
            </Button>
          </Stack>
        </Box>

        {/* ── Footer ────────────────────────────────────────── */}
        <Typography
          sx={{
            mt:        2.5,
            textAlign: 'center',
            fontSize:  '0.8rem',
            color:     CLONE_TOKENS.text3,
          }}
        >
          Don&apos;t have an account?{' '}
          <Box
            component={NextLink}
            href="/signup"
            sx={{
              color:          CLONE_TOKENS.accent,
              fontWeight:     600,
              textDecoration: 'none',
              '&:hover':      { textDecoration: 'underline' },
            }}
          >
            Create one →
          </Box>
        </Typography>

        <Typography
          sx={{
            mt:        1,
            textAlign: 'center',
            fontSize:  '0.78rem',
            color:     CLONE_TOKENS.text3,
          }}
        >
          Or{' '}
          <Box
            component={NextLink}
            href="/ai"
            sx={{
              color:          CLONE_TOKENS.text2,
              fontWeight:     500,
              textDecoration: 'none',
              '&:hover':      { textDecoration: 'underline' },
            }}
          >
            continue without signing in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Layout assignment ────────────────────────────────────────────────────────

const SignInRoute: NextPageWithLayout = () => <SignInPage />;

SignInRoute.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default SignInRoute;
