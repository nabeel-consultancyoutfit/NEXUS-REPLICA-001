import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import CustomButton from '@/components/Buttons/CustomButton';
import PlainLayout from '@/layout/PlainLayout';

function ForbiddenContent() {
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
            backgroundColor: 'error.light',
            borderRadius: '50%',
            display: 'inline-flex',
          }}
        >
          <LockOutlined
            sx={{
              fontSize: 80,
              color: 'error.main',
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          403 - Access Denied
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 4, maxWidth: 400 }}>
          You don't have permission to access this resource. If you believe this is a mistake,
          please contact your administrator.
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

export default function Forbidden403Page() {
  return <ForbiddenContent />;
}

Forbidden403Page.getLayout = (page: ReactElement) => <PlainLayout>{page}</PlainLayout>;
