/**
 * ClonePromptCard — the generated AI prompt card shown at the end of guided discovery.
 *
 * Matches the reference site:
 *   • "YOUR AI PROMPT" orange tag
 *   • Multi-line prompt text in a light box
 *   • Action buttons: Run prompt | Edit | Regenerate | Delete
 *   • Status label: "NexusAI Hub · prompt ready"
 */
import React, { useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CLONE_TOKENS } from '@/theme/clone-theme';

interface ClonePromptCardProps {
  promptText:  string;
  onRun:       (text: string) => void;
  onRegenerate: () => void;
  onDelete:    () => void;
}

export default function ClonePromptCard({
  promptText,
  onRun,
  onRegenerate,
  onDelete,
}: ClonePromptCardProps) {
  const [isEditing, setIsEditing]   = useState(false);
  const [editedText, setEditedText] = useState(promptText);

  const handleRun = () => {
    onRun(editedText);
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
      <Box sx={{ maxWidth: 520, width: '100%' }}>
        {/* Card */}
        <Box
          sx={{
            backgroundColor: CLONE_TOKENS.white,
            border:          `1px solid ${CLONE_TOKENS.border}`,
            borderRadius:    '16px',
            p:               '1.1rem',
            boxShadow:       '0 2px 8px rgba(28,26,22,0.06)',
          }}
        >
          {/* Category tag */}
          <Box
            sx={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '4px',
              px:             '0.6rem',
              py:             '2px',
              borderRadius:   '20px',
              backgroundColor: '#FDF1EB',
              border:         `1px solid rgba(200,98,42,0.18)`,
              mb:             '0.85rem',
            }}
          >
            <Box
              sx={{
                width:           6,
                height:          6,
                borderRadius:    '50%',
                backgroundColor: CLONE_TOKENS.accent,
                flexShrink:      0,
              }}
            />
            <Typography
              sx={{
                fontSize:    '0.65rem',
                fontWeight:  700,
                color:       CLONE_TOKENS.accent,
                letterSpacing: '0.04em',
              }}
            >
              YOUR AI PROMPT
            </Typography>
          </Box>

          {/* Prompt text or edit input */}
          {isEditing ? (
            <InputBase
              multiline
              fullWidth
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              sx={{
                fontSize:        '0.82rem',
                lineHeight:      1.6,
                color:           CLONE_TOKENS.text,
                backgroundColor: CLONE_TOKENS.bg,
                borderRadius:    '10px',
                border:          `1.5px solid ${CLONE_TOKENS.accent}`,
                p:               '0.65rem 0.75rem',
                mb:              '0.85rem',
                fontFamily:      'inherit',
              }}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: CLONE_TOKENS.bg,
                borderRadius:    '10px',
                p:               '0.65rem 0.75rem',
                mb:              '0.85rem',
              }}
            >
              <Typography
                sx={{
                  fontSize:   '0.82rem',
                  lineHeight: 1.65,
                  color:      CLONE_TOKENS.text,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {editedText}
              </Typography>
            </Box>
          )}

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            <Button
              onClick={handleRun}
              startIcon={<PlayArrowIcon sx={{ fontSize: '0.9rem !important' }} />}
              sx={{
                background:    `linear-gradient(135deg, ${CLONE_TOKENS.accent}, #A34D1E)`,
                color:         '#fff',
                fontSize:      '0.72rem',
                fontWeight:    700,
                px:            '0.9rem',
                py:            '0.35rem',
                borderRadius:  '8px',
                textTransform: 'none',
                '&:hover':     { opacity: 0.9 },
              }}
            >
              Run prompt
            </Button>

            <Button
              onClick={() => setIsEditing((v) => !v)}
              startIcon={<EditOutlinedIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                color:         CLONE_TOKENS.text2,
                fontSize:      '0.72rem',
                fontWeight:    600,
                px:            '0.75rem',
                py:            '0.35rem',
                borderRadius:  '8px',
                textTransform: 'none',
                border:        `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.bg,
                '&:hover':     { backgroundColor: CLONE_TOKENS.bg2 },
              }}
            >
              {isEditing ? 'Done' : 'Edit'}
            </Button>

            <Button
              onClick={onRegenerate}
              startIcon={<RefreshOutlinedIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                color:         CLONE_TOKENS.text2,
                fontSize:      '0.72rem',
                fontWeight:    600,
                px:            '0.75rem',
                py:            '0.35rem',
                borderRadius:  '8px',
                textTransform: 'none',
                border:        `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.bg,
                '&:hover':     { backgroundColor: CLONE_TOKENS.bg2 },
              }}
            >
              Regenerate
            </Button>

            <Button
              onClick={onDelete}
              startIcon={<CloseOutlinedIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                color:         CLONE_TOKENS.text3,
                fontSize:      '0.72rem',
                fontWeight:    600,
                px:            '0.75rem',
                py:            '0.35rem',
                borderRadius:  '8px',
                textTransform: 'none',
                border:        `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: CLONE_TOKENS.bg,
                '&:hover':     { color: '#c0392b', backgroundColor: '#FFF0EE' },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {/* Status label */}
        <Typography
          sx={{
            fontSize:  '0.62rem',
            color:     CLONE_TOKENS.text3,
            mt:        '5px',
            px:        '4px',
          }}
        >
          NexusAI Hub · prompt ready
        </Typography>
      </Box>
    </Box>
  );
}
