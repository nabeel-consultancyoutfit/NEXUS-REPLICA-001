
import React from 'react';
import { Box } from '@mui/material';

interface PlainLayoutProps {
  children: React.ReactNode;
}

export default function PlainLayout({ children }: PlainLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      {children}
    </Box>
  );
}
