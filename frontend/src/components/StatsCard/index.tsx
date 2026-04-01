/**
 * StatsCard — workspace component used by the dashboard to display
 * a single KPI statistic with an icon, title, and value.
 *
 * Uses the workspace theme (primary: #38CAB5).
 */
import React, { ReactElement } from 'react';
import { Card, Box, Typography, Avatar } from '@mui/material';

interface StatsCardProps {
  title: string;
  value:  string | number;
  icon:   ReactElement;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card
      sx={{
        p:              2.5,
        display:        'flex',
        alignItems:     'center',
        gap:            2,
        height:         '100%',
        borderRadius:   2,
        boxShadow:      1,
      }}
    >
      <Avatar
        sx={{
          bgcolor:    'primary.light',
          color:      'primary.main',
          width:      48,
          height:     48,
          flexShrink: 0,
          '& .MuiSvgIcon-root': { fontSize: 24 },
        }}
      >
        {icon}
      </Avatar>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display:      'block',
            fontWeight:   500,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          sx={{ lineHeight: 1.3 }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
}
