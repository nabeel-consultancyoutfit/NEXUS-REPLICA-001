import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { CLONE_MOCK_MODELS } from '../../mock';

interface CloneModelFollowupCardProps {
  modelId: string;
}

const FOLLOWUP_QUESTIONS: Record<string, string[]> = {
  'gpt-5': [
    'What is GPT-5 best at?',
    'How fast is it and what affects latency?',
    'What does it cost at small vs large scale?',
    'Does it support function/tool calling?',
    'What input/output formats work best?',
    'How does context window impact results?',
    'How does GPT-5 compare to alternatives?',
    'What about privacy and data safety?',
    'Show a few great starter prompts.',
  ],
  'gpt-5-2': [
    'What is GPT-5.2 best at?',
    'How is it different from GPT-5?',
    'What does it cost for multimodal workflows?',
    'Is it better for balanced production use?',
    'What prompt formats work best?',
    'How does it compare to GPT-5 Turbo?',
    'What are strong starter use cases?',
    'What about privacy and data safety?',
    'Show a few great starter prompts.',
  ],
};

export default function CloneModelFollowupCard({ modelId }: CloneModelFollowupCardProps) {
  const model = CLONE_MOCK_MODELS.find((entry) => entry.id === modelId);

  if (!model) return null;

  const questions = FOLLOWUP_QUESTIONS[modelId] ?? [
    `What is ${model.name} best at?`,
    'How fast is it?',
    'What does it cost?',
    'How does it compare to alternatives?',
    'Show a few great starter prompts.',
  ];

  return (
    <Box sx={{ maxWidth: 620, mb: 2 }}>
      <Box
        sx={{
          mb: 1,
          px: 1.2,
          py: 1.05,
          borderRadius: '14px',
          border: `1px solid ${CLONE_TOKENS.border}`,
          backgroundColor: CLONE_TOKENS.white,
          boxShadow: '0 8px 24px rgba(28,26,22,0.06)',
        }}
      >
        <Typography sx={{ fontSize: '0.95rem', color: CLONE_TOKENS.text, lineHeight: 1.55 }}>
          Before we pick a version of <Box component="span" sx={{ fontWeight: 800 }}>{model.name}</Box>, here are helpful
          {' '}questions people ask. Tap any to learn more, or continue to select a version.
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: '0.68rem',
          fontWeight: 800,
          color: '#CFA15E',
          letterSpacing: '0.06em',
          mb: 1,
          px: 0.3,
        }}
      >
        {`GPT-5 ${model.name === 'GPT-5' ? 'INSPIRATION' : 'OVERVIEW'}`}
      </Typography>

      <Box
        sx={{
          px: 1,
          py: 1,
          borderRadius: '18px',
          border: `1px solid ${CLONE_TOKENS.border}`,
          backgroundColor: CLONE_TOKENS.white,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {questions.map((question, index) => (
            <Box
              key={question}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: '0.78rem',
                py: '0.5rem',
                borderRadius: '999px',
                border: `1px solid ${CLONE_TOKENS.border}`,
                backgroundColor: '#FFF',
                color: CLONE_TOKENS.text2,
                fontSize: '0.76rem',
                lineHeight: 1.2,
              }}
            >
              <Box component="span" sx={{ fontSize: '0.8rem' }}>
                {index % 3 === 0 ? '💡' : index % 3 === 1 ? '⚡' : '🧠'}
              </Box>
              <Box component="span">{question}</Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 1.3,
            p: 1.1,
            borderRadius: '14px',
            border: `1px solid ${CLONE_TOKENS.border}`,
            backgroundColor: '#FCFAF7',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem', color: CLONE_TOKENS.text2, mb: 1 }}>
            Ready to choose a version?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<VisibilityOutlinedIcon sx={{ fontSize: '0.9rem !important' }} />}
              sx={{
                textTransform: 'none',
                borderRadius: '999px',
                border: `1px solid ${CLONE_TOKENS.border}`,
                color: CLONE_TOKENS.text2,
                fontSize: '0.76rem',
                fontWeight: 600,
              }}
            >
              View full details
            </Button>
            <Button
              size="small"
              endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '0.95rem !important' }} />}
              sx={{
                textTransform: 'none',
                borderRadius: '999px',
                border: `1px solid ${CLONE_TOKENS.border}`,
                color: CLONE_TOKENS.text2,
                fontSize: '0.76rem',
                fontWeight: 600,
              }}
            >
              Select a version
            </Button>
          </Stack>
        </Box>
      </Box>

      <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3, mt: 0.8, px: 0.3 }}>
        NexusAI Hub · {model.name} overview
      </Typography>
    </Box>
  );
}
