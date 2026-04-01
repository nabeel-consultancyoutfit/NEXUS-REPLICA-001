
import React from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }

  return <>{children}</>;
}
