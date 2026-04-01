
import React, { ReactNode, ErrorInfo } from 'react';
import { Box, Typography, Button, SxProps, Theme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorBoundaryProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
            p: 2,
            textAlign: 'center',
            ...this.props.sx,
          }}
        >
          <ErrorOutline sx={{ fontSize: 64, color: 'error.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
            {this.state.error?.message || 'An unexpected error occurred. Please reload the page.'}
          </Typography>
          <Button variant="contained" color="primary" onClick={this.handleReload}>
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
