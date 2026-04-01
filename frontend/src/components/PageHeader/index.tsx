
import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  SxProps,
  Theme,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  sx,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBreadcrumbClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Box sx={sx}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 1 }}
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={index}>
              {crumb.href ? (
                <MuiLink
                  component="button"
                  variant="body2"
                  onClick={() => handleBreadcrumbClick(crumb.href)}
                  sx={{ cursor: 'pointer' }}
                >
                  {crumb.label}
                </MuiLink>
              ) : (
                <Typography variant="body2" color="text.primary">
                  {crumb.label}
                </Typography>
              )}
            </div>
          ))}
        </Breadcrumbs>
      )}

      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        {/* Left: Title and Subtitle */}
        <Box>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Right: Actions */}
        {actions && <Box>{actions}</Box>}
      </Box>
    </Box>
  );
}
