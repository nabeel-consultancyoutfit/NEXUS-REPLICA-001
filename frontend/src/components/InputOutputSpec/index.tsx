import React from 'react';
import { Card, Box, Typography, Stack, Chip, SxProps, Theme } from '@mui/material';

export interface Spec {
  label: string;
  value: string | string[];
}

export interface InputOutputSpecProps {
  title: string;
  specs: Spec[];
  sx?: SxProps<Theme>;
}

function SpecItem({ label, value }: Spec) {
  const isArray = Array.isArray(value);

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      {isArray ? (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {(value as string[]).map((v, idx) => (
            <Chip
              key={idx}
              label={v}
              size="small"
              variant="outlined"
              sx={{
                bgcolor: 'background.default',
                color: 'text.secondary',
              }}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      )}
    </Box>
  );
}

export default function InputOutputSpec({
  title,
  specs,
  sx,
}: InputOutputSpecProps) {
  return (
    <Card sx={{ p: 2.5, ...sx }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      <Stack spacing={2}>
        {specs.map((spec, idx) => (
          <SpecItem key={idx} {...spec} />
        ))}
      </Stack>
    </Card>
  );
}

export type { InputOutputSpecProps, Spec };
