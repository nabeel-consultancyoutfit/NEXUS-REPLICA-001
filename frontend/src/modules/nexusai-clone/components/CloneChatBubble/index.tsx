/**
 * CloneChatBubble — chat message bubble matching the Chat Hub style:
 *   user messages → right-aligned, accent color background
 *   AI messages   → left-aligned, white background
 */
import React from 'react';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import type { CloneChatMessage } from '../../types';

interface CloneChatBubbleProps {
  message: CloneChatMessage;
  modelName?: string;
}

export default function CloneChatBubble({ message, modelName = 'GPT-5' }: CloneChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display:        'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb:             1.5,
        animation:      'cloneFadeIn 0.2s ease',
        '@keyframes cloneFadeIn': {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Stack
        direction={isUser ? 'row-reverse' : 'row'}
        spacing={1}
        alignItems="flex-end"
        sx={{ maxWidth: '72%' }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width:           28,
            height:          28,
            fontSize:        '0.7rem',
            fontWeight:      700,
            backgroundColor: isUser ? CLONE_TOKENS.accent : CLONE_TOKENS.bg3,
            color:           isUser ? '#fff' : CLONE_TOKENS.text2,
            flexShrink:      0,
          }}
        >
          {isUser ? 'U' : '🤖'}
        </Avatar>

        {/* Bubble */}
        <Box>
          {!isUser && (
            <Typography
              sx={{
                fontSize:  '0.68rem',
                color:     CLONE_TOKENS.text3,
                mb:        '3px',
                px:        '4px',
              }}
            >
              {modelName}
            </Typography>
          )}
          <Box
            sx={{
              px:              '1rem',
              py:              '0.625rem',
              borderRadius:    isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              backgroundColor: isUser ? CLONE_TOKENS.accent : CLONE_TOKENS.white,
              border:          isUser ? 'none' : `1px solid ${CLONE_TOKENS.border}`,
              boxShadow:       `0 1px 4px rgba(28,26,22,0.06)`,
            }}
          >
            <Typography
              sx={{
                fontSize:   '0.875rem',
                lineHeight: 1.55,
                color:      isUser ? '#FFFFFF' : CLONE_TOKENS.text,
                whiteSpace: 'pre-wrap',
              }}
            >
              {message.content}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize:  '0.62rem',
              color:     CLONE_TOKENS.text3,
              mt:        '3px',
              px:        '4px',
              textAlign: isUser ? 'right' : 'left',
            }}
          >
            {message.timestamp}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
