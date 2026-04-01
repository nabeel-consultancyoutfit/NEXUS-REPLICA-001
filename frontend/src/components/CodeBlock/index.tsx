import React from 'react';
import { Card, Box, Typography, IconButton, Stack, SxProps, Theme } from '@mui/material';
import { ContentCopyOutlined, CheckOutlined } from '@mui/icons-material';
import { useState } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  copyable?: boolean;
  sx?: SxProps<Theme>;
}

export default function CodeBlock({
  code,
  language = 'text',
  title,
  copyable = true,
  sx,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Header */}
      {(title || copyable) && (
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            bgcolor: 'action.hover',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title && (
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {title}
            </Typography>
          )}
          {copyable && (
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {copied ? (
                <CheckOutlined fontSize="small" />
              ) : (
                <ContentCopyOutlined fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      )}

      {/* Code */}
      <Box
        component="pre"
        sx={{
          p: 2.5,
          m: 0,
          overflow: 'auto',
          bgcolor: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: 'Fira Code, monospace',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: '#1e1e1e',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#555',
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#777',
            },
          },
        }}
      >
        <code>{code}</code>
      </Box>
    </Card>
  );
}

export type { CodeBlockProps };
