
import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
        ...sx,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          mb: 2,
          color: 'text.secondary',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {icon || <InboxOutlined sx={{ fontSize: 64 }} />}
      </Box>

      {/* Title */}
      {title && (
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      {/* Description */}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
          {description}
        </Typography>
      )}

      {/* Action */}
      {action && <Box>{action}</Box>}
    </Box>
  );
}
