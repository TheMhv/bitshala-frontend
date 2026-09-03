import type { ReactNode } from 'react';
import { Box, Chip, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { Award } from 'lucide-react';
import { fellowshipDarkTheme } from './theme';

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  hideIcon?: boolean;
}

export const FellowshipPageLayout = ({ children, title, subtitle, badge, hideIcon }: Props) => {
  return (
    <ThemeProvider theme={fellowshipDarkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#0e0e10',
          color: '#F7F7F5',
          px: { xs: 2, md: 5, lg: 8 },
          py: 3,
          fontFamily: 'Sora, sans-serif',
        }}
      >
        {title && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 4,
            }}
          >
            {!hideIcon && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 2.5,
                  bgcolor: '#0B2E28',
                  border: '1px solid rgba(249,115,22,0.25)',
                  flexShrink: 0,
                }}
              >
                <Award size={24} color="#09BA5B" />
              </Box>
            )}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#F7F7F5',
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                  }}
                >
                  {title}
                </Typography>
                {badge && (
                  <Chip
                    label={badge}
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      bgcolor: '#0B2E28',
                      color: '#09BA5B',
                      border: '1px solid rgba(249,115,22,0.25)',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 24,
                    }}
                  />
                )}
              </Box>
              {subtitle && (
                <Typography variant="body2" sx={{ color: '#BFBEC2', mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default FellowshipPageLayout;
