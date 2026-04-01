import React, { useState } from 'react';
import { Card, Box, Typography, TextField, Button, Stack, Avatar, SxProps, Theme } from '@mui/material';
import { ChatBubbleOutlineOutlined, CloseOutlined } from '@mui/icons-material';

export interface HelpWidgetProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  onSubmit?: (message: string) => void;
  sx?: SxProps<Theme>;
}

export default function HelpWidget({
  title = 'Need help choosing?',
  subtitle = 'Chat with our AI guide for a personalised recommendation in 60 seconds.',
  placeholder = 'Describe your project, ask a question, or just say hi — I\'m here to help…',
  onSubmit,
  sx,
}: HelpWidgetProps) {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit?.(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isMinimized) {
    return (
      <Box
        onClick={() => setIsMinimized(false)}
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: 4,
          },
          ...sx,
        }}
      >
        <ChatBubbleOutlineOutlined />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        p: 2.5,
        maxWidth: 360,
        ...sx,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          onClick={() => setIsMinimized(true)}
          sx={{ minWidth: 32, p: 0.5, color: 'text.secondary' }}
        >
          <CloseOutlined fontSize="small" />
        </Button>
      </Box>

      {/* Input Area */}
      <Stack spacing={1}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
            },
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={!message.trim()}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Ask
          </Button>
        </Box>
      </Stack>

      {/* Quick Actions */}
      <Typography variant="caption" sx={{ display: 'block', mt: 2, mb: 1, color: 'text.secondary' }}>
        Quick questions:
      </Typography>
      <Stack spacing={0.75}>
        {['Show me popular models', 'What can AI do for me?', 'I want to build a chatbot'].map((action) => (
          <Button
            key={action}
            variant="text"
            size="small"
            fullWidth
            onClick={() => {
              setMessage(action);
            }}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'primary.main',
              },
            }}
          >
            {action}
          </Button>
        ))}
      </Stack>
    </Card>
  );
}

export type { HelpWidgetProps };
