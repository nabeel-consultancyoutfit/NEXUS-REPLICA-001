import { Box, Card, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

export default function StatsCard({ title, value, icon, subtitle, sx }: StatsCardProps) {
  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {icon && (
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: 'primary.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            '& svg': { fontSize: 26 },
          }}
        >
          {icon}
        </Box>
      )}
    </Card>
  );
}

export type { StatsCardProps };
