
import React from 'react';
import { Box, CircularProgress, Typography, SxProps, Theme } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullPage?: boolean;
  sx?: SxProps<Theme>;
}

export default function LoadingSpinner({
  size = 40,
  message,
  fullPage = false,
  sx,
}: LoadingSpinnerProps) {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...sx,
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullPage) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}
