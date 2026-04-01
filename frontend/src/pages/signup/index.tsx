/**
 * Route: /signup
 *
 * Sign Up page — matches the NexusAI Clone visual theme.
 * Calls POST /api/auth/signup via RTK Query, stores the token in
 * AuthContext + Redux + localStorage, then redirects to /ai.
 *
 * Name field matches backend SignupDto (single `name` field, not first/last).
 * Password minimum: 6 chars (matches backend @MinLength(6)).
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
import { useSignupMutation } from '@/services/auth';
import { useAuthContext } from '@/contexts/AuthContext';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { extractErrorMessage } from '@/types/shared';

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = yup.object({
  name:     yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email:    yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormValues = yup.InferType<typeof schema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

function SignUpPage() {
  const router                 = useRouter();
  const { login }              = useAuthContext();
  const [signupMutation, { isLoading }] = useSignupMutation();
  const [apiError, setApiError]         = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setApiError('');
    try {
      const response = await signupMutation({
        name:     values.name,
        email:    values.email,
        password: values.password,
      }).unwrap();

      // Persist token + update context
      login(response.accessToken, response.user);

      // Redirect to the app home
      router.push('/ai');
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
            Create your account
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: CLONE_TOKENS.text3 }}>
            Join NexusAI — free to start, no card required
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
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
                  autoComplete="new-password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message ?? 'At least 6 characters'}
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
                mt:            0.5,
                py:            1.2,
                borderRadius:  '10px',
                fontSize:      '0.9rem',
                fontWeight:    700,
                background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent} 0%, ${CLONE_TOKENS.accentDark} 100%)`,
                color:         '#fff',
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
                : 'Create account →'}
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
          Already have an account?{' '}
          <Box
            component={NextLink}
            href="/signin"
            sx={{
              color:          CLONE_TOKENS.accent,
              fontWeight:     600,
              textDecoration: 'none',
              '&:hover':      { textDecoration: 'underline' },
            }}
          >
            Sign in
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

const SignUpRoute: NextPageWithLayout = () => <SignUpPage />;

SignUpRoute.getLayout = (page: ReactElement) => (
  <ClonePageLayout>{page}</ClonePageLayout>
);

export default SignUpRoute;
