import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  Container,
  TextField,
  Typography,
  Avatar,
  Alert,
  FormHelperText,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import CustomButton from '@/components/Buttons/CustomButton';
import GuestGuard from '@/GuardsAndPermissions/GuestGuard';
import PlainLayout from '@/layout/PlainLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { showError } from '@/lib/snackbar';

interface LoginFormInputs {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function LoginPageContent() {
  const router = useRouter();
  const { login } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Login failed. Please try again.'
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card
          sx={{
            p: 4,
            boxShadow: 3,
            width: '100%',
            maxWidth: 420,
          }}
        >
          {/* Logo & Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                backgroundColor: 'primary.main',
                margin: '0 auto',
                mb: 2,
              }}
            >
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to your account
            </Typography>
          </Box>

          {/* Demo Credentials Alert */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
              Demo Credentials:
            </Typography>
            <Typography variant="caption">
              Email: admin@example.com
            </Typography>
            <br />
            <Typography variant="caption">
              Password: password123
            </Typography>
          </Alert>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <Box sx={{ mb: 3 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      size="small"
                    />
                    {errors.email && (
                      <FormHelperText error>{errors.email.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ mb: 3 }}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      size="small"
                    />
                    {errors.password && (
                      <FormHelperText error>{errors.password.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </Box>

            {/* Submit Button */}
            <CustomButton
              fullWidth
              type="submit"
              label="Sign In"
              loading={isSubmitting}
              sx={{ mt: 2 }}
            />
          </form>
        </Card>
      </Box>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <GuestGuard>
      <LoginPageContent />
    </GuestGuard>
  );
}

LoginPage.getLayout = (page: ReactElement) => <PlainLayout>{page}</PlainLayout>;
