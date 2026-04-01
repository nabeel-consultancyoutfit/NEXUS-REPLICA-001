import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { CLONE_TOKENS } from '@/theme/clone-theme';
import { CLONE_MOCK_MODELS } from '../../mock';

interface CloneModelRecommendationCardProps {
  intro?: string;
  modelIds: string[];
  onProceedModel: (modelId: string) => void;
}

export default function CloneModelRecommendationCard({
  intro,
  modelIds,
  onProceedModel,
}: CloneModelRecommendationCardProps) {
  const models = modelIds
    .map((id) => CLONE_MOCK_MODELS.find((model) => model.id === id))
    .filter((model): model is NonNullable<typeof model> => Boolean(model));

  if (models.length === 0) return null;

  return (
    <Box
      sx={{
        maxWidth: 520,
        mb: 2,
        px: 1.1,
        py: 1.1,
        borderRadius: '16px',
        backgroundColor: CLONE_TOKENS.white,
        border: `1px solid ${CLONE_TOKENS.border}`,
        boxShadow: '0 10px 26px rgba(28,26,22,0.08)',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.9rem',
          color: CLONE_TOKENS.text,
          lineHeight: 1.55,
          mb: 1.25,
        }}
      >
        {intro ?? 'Here are the most relevant models based on this chat so far.'}
      </Typography>

      <Stack spacing={1}>
        {models.map((model) => (
          <Box
            key={model.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.1,
              p: '0.8rem',
              borderRadius: '14px',
              border: `1px solid ${CLONE_TOKENS.border}`,
              backgroundColor: '#FCFAF7',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                borderColor: CLONE_TOKENS.accent,
                boxShadow: '0 8px 18px rgba(200,98,42,0.10)',
              },
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                backgroundColor: model.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
              }}
            >
              {model.icon}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: CLONE_TOKENS.text,
                  lineHeight: 1.2,
                }}
              >
                {model.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: CLONE_TOKENS.text3,
                  mt: '2px',
                }}
              >
                {model.capabilities[0] ?? model.provider}
                {' '}
                {model.pricePerMToken !== undefined ? `· $${model.pricePerMToken}/1M tk` : '· Free'}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.75}>
              <Button
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                startIcon={<VisibilityOutlinedIcon sx={{ fontSize: '0.9rem !important' }} />}
                sx={{
                  textTransform: 'none',
                  minWidth: 0,
                  px: 1.2,
                  py: 0.65,
                  borderRadius: '999px',
                  border: `1px solid ${CLONE_TOKENS.border}`,
                  backgroundColor: CLONE_TOKENS.white,
                  color: CLONE_TOKENS.text2,
                  fontSize: '0.76rem',
                  fontWeight: 600,
                }}
              >
                Details
              </Button>
              <Button
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onProceedModel(model.id);
                }}
                endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '0.95rem !important' }} />}
                sx={{
                  textTransform: 'none',
                  minWidth: 0,
                  px: 1.3,
                  py: 0.65,
                  borderRadius: '999px',
                  backgroundColor: CLONE_TOKENS.accent,
                  color: '#fff',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  '&:hover': { backgroundColor: CLONE_TOKENS.accentDark },
                }}
              >
                Proceed
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Typography sx={{ fontSize: '0.68rem', color: CLONE_TOKENS.text3, mt: 1.1 }}>
        NexusAI Hub simulation
      </Typography>
    </Box>
  );
}
