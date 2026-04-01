import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <LoadingSpinner />
    </Box>
  );
}

IndexPage.getLayout = (page: ReactElement) => page;
