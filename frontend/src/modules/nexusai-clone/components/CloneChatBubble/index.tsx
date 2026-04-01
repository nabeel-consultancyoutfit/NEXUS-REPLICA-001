/**
 * CloneChatBubble — chat message bubble matching the Chat Hub style.
 *
 * user messages     → right-aligned, accent background
 * assistant messages → left-aligned, white background, NexusAI "N" icon
 *
 * Now accepts flat props (role + content + ...) instead of a message object,
 * so it integrates cleanly with the new ChatItem system.
 */
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface CloneChatBubbleProps {
  role:         'user' | 'assistant';
  content:      string;
  timestamp?:   string;
  modelName?:   string;   // shown above assistant bubble
  statusLabel?: string;   // shown below bubble, e.g. 'NexusAI Hub · guided setup'
}

export default function CloneChatBubble({
  role,
  content,
  timestamp,
  modelName,
  statusLabel,
}: CloneChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display:        'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb:             1.5,
        animation:      'cloneFadeIn 0.2s ease',
        '@keyframes cloneFadeIn': {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to:   { opacity: 1, transform: 'translateY(0)'   },
        },
      }}
    >
      <Box
        sx={{
          display:    'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          gap:        '0.5rem',
          maxWidth:   '75%',
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width:           28,
            height:          28,
            fontSize:        isUser ? '0.7rem' : '0.65rem',
            fontWeight:      800,
            backgroundColor: isUser ? CLONE_TOKENS.accent : CLONE_TOKENS.accent,
            color:           '#fff',
            flexShrink:      0,
            fontFamily:      isUser ? 'inherit' : '"Syne", sans-serif',
          }}
        >
          {isUser ? 'U' : 'N'}
        </Avatar>

        {/* Bubble + meta */}
        <Box>
          {/* Model name (assistant only) */}
          {!isUser && modelName && (
            <Typography
              sx={{
                fontSize: '0.68rem',
                color:    CLONE_TOKENS.text3,
                mb:       '3px',
                px:       '4px',
              }}
            >
              {modelName}
            </Typography>
          )}

          {/* Message bubble */}
          <Box
            sx={{
              px:              '1rem',
              py:              '0.625rem',
              borderRadius:    isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              backgroundColor: isUser ? CLONE_TOKENS.accent : CLONE_TOKENS.white,
              border:          isUser ? 'none' : `1px solid ${CLONE_TOKENS.border}`,
              boxShadow:       '0 1px 4px rgba(28,26,22,0.06)',
            }}
          >
            <Typography
              sx={{
                fontSize:   '0.875rem',
                lineHeight: 1.6,
                color:      isUser ? '#FFFFFF' : CLONE_TOKENS.text,
                whiteSpace: 'pre-wrap',
              }}
            >
              {content}
            </Typography>
          </Box>

          {/* Timestamp + status label */}
          <Box
            sx={{
              display:   'flex',
              flexDirection: isUser ? 'row-reverse' : 'row',
              gap:       '6px',
              mt:        '3px',
              px:        '4px',
              alignItems: 'center',
            }}
          >
            {timestamp && (
              <Typography sx={{ fontSize: '0.62rem', color: CLONE_TOKENS.text3 }}>
                {timestamp}
              </Typography>
            )}
            {!isUser && statusLabel && (
              <Typography sx={{ fontSize: '0.62rem', color: CLONE_TOKENS.text3 }}>
                · {statusLabel}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
