import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Link, Typography } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { redirectToDiscordAuth } from '../services/auth';
import { rememberReturnPath } from '../utils/returnPath';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate ]);

  const signIn = () => {
    // Discord sends us back to `/`, which has no idea where we started, so
    // stash it first. See utils/returnPath.
    rememberReturnPath(window.location.pathname + window.location.search);
    redirectToDiscordAuth();
  };

  return (
    <Box sx={{
      backgroundImage: 'url(/login_bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100dvh',
      maxHeight: '100dvh',
      width: '100%',
      color: 'white',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          maxHeight: '100%',
          boxSizing: 'border-box',
          py: { xs: 3, md: 5 },
          px: { xs: 3, md: 10 }
        }}
      >
        {/*Header*/}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
                component="img"
                src="/lms_logo.svg"
                alt="logo"
                sx={{
                  width: { xs: 130, sm: 160, md: 218 },
                  height: 'auto'
                }}
            />
          </Box>

          <Link
            component={RouterLink}
            to='/myDashboard'
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#F7F7F5',
              fontSize: '0.875rem',
            }}
          >
            Explore Courses <ArrowUpRight size={16} />
          </Link>
        </Box>

        {/*Main*/}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            overflow: 'auto',
            py: { xs: 4, md: 0 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: '1 1 320px',
              minWidth: 0
            }}
          >
            <Typography
              sx={{
                color: '#09BA5B',
                textTransform: 'uppercase',
                fontWeight: 400,
                fontSize: 13,
              }}
            >
              Learning Lab
            </Typography>

            <Typography
              variant='h1'
              component='h1'
            >
              <Typography
                component='span'
                sx={{
                  display: 'block',
                  color: '#F7F7F5',
                  fontWeight: 600,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                }}
              >
                Learn Bitcoin.
              </Typography>
              <Typography
                component='span'
                sx={{
                  display: 'block',
                  color: '#09BA5B',
                  fontWeight: 600,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                }}
              >
                Build what&rsquo;s next.
              </Typography>
            </Typography>

            <Typography
              sx={{
                color: '#BFBEC2',
                fontWeight: 400,
                fontSize: 18,
              }}
            >
              Continue your journey in Bitcoin and
              <br/>
              open-source development.
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(18px)',
              gap: '32px',
              borderRadius: '24px',
              borderWidth: '1px',
              p: '44px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%'
              }}
            >
              <Typography
                variant='h2'
                component='h2'
                sx={{
                  fontWeight: 600,
                  fontSize: '32px',
                }}
              >
                Welcome back
              </Typography>

              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                }}
              >
                Sign in to continue your learning journey.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                py: '32px'
              }}
            >
              <Button
                onClick={signIn}
                fullWidth
                variant="contained"
                startIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                }
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  bgcolor: '#5865F2',
                  py: 1.4,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#4752c4' },
                }}
              >
                Sign in with Discord
              </Button>
            </Box>

            <Box

            >
              <Link
                component={RouterLink}
                to='/myDashboard'
                sx={{
                  color: '#BFBEC2',
                  fontWeight: 400,
                  fontSize: '13px',
                }}
              >
                You can keep browsing cohorts and curriculum without an account.
              </Link>
            </Box>
          </Box>
        </Box>

        {/*Footer*/}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              color: '#BFBEC2',
              fontWeight: 400,
              fontSize: 12,
            }}
          >
            © 2026 Vinteum
          </Typography>

          <Typography
            sx={{
              color: '#BFBEC2',
              fontWeight: 400,
              fontSize: 12,
            }}
          >
            Open source. Open possibilities.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
