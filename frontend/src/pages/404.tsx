import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { SearchOffOutlined } from '@mui/icons-material';
import CustomButton from '@/components/Buttons/CustomButton';
import PlainLayout from '@/layout/PlainLayout';

function NotFoundContent() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: 'action.hover',
            borderRadius: '50%',
            display: 'inline-flex',
          }}
        >
          <SearchOffOutlined
            sx={{
              fontSize: 80,
              color: 'text.secondary',
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          404 - Page Not Found
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 4, maxWidth: 400 }}>
          The page you're looking for doesn't exist. It might have been removed or the URL might
          be incorrect.
        </Typography>

        <CustomButton
          label="Go Back to Dashboard"
          onClick={() => router.push('/dashboard')}
          variant="contained"
        />
      </Box>
    </Container>
  );
}

export default function NotFound404Page() {
  return <NotFoundContent />;
}

NotFound404Page.getLayout = (page: ReactElement) => <PlainLayout>{page}</PlainLayout>;
