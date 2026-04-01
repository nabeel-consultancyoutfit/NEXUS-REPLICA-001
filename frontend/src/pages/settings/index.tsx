import { ReactElement, useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import PageHeader from '@/components/PageHeader/index';
import CustomButton from '@/components/Buttons/CustomButton';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/redux/store';
import { setTheme } from '@/redux/slices/ui';
import { showSuccess } from '@/lib/snackbar';

function SettingsContent() {
  const { user } = useAuthContext();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      showSuccess('Profile updated successfully');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetTheme = (themeName: string) => {
    dispatch(setTheme(themeName));
    showSuccess(`Theme changed to ${themeName}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <PageHeader title="Settings" />

      <Grid container spacing={3}>
        {/* Profile Settings Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Profile Settings
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                size="small"
              />

              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                size="small"
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
              />

              <Box sx={{ pt: 1 }}>
                <CustomButton
                  label="Save Changes"
                  onClick={handleSaveProfile}
                  loading={isSaving}
                  fullWidth
                />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Appearance Settings Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Appearance
            </Typography>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 2 }}>
                Theme
              </Typography>
              <Stack direction="row" spacing={2}>
                <CustomButton
                  label="Light"
                  onClick={() => handleSetTheme('light')}
                  variant="outlined"
                  size="small"
                />
                <CustomButton
                  label="Dark"
                  onClick={() => handleSetTheme('dark')}
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
                Theme Settings
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Additional theme customization options will appear here as the dashboard evolves.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}

SettingsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
