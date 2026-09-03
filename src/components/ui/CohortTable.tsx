import type { ReactNode } from 'react';
import type { CohortRow } from '../../types/cohort';
export type { CohortRow };
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

type CohortTableProps = {
  cohorts: CohortRow[];
  onRowClick?: (cohort: CohortRow) => void;
  actions?: (cohort: CohortRow) => ReactNode;
  loading?: boolean;
  emptyMessage?: ReactNode;
};

// Interpolate across multiple hex color stops based on t (0 to 1)
const interpolateColor = (t: number, colors: string[]) => {
  const hexToRgb = (hex: string) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };

  const segments = colors.length - 1;
  const segment = Math.min(Math.floor(t * segments), segments - 1);
  const localT = t * segments - segment;

  const [r1, g1, b1] = hexToRgb(colors[segment]);
  const [r2, g2, b2] = hexToRgb(colors[segment + 1]);

  const r = Math.round(r1 + (r2 - r1) * localT);
  const g = Math.round(g1 + (g2 - g1) * localT);
  const b = Math.round(b1 + (b2 - b1) * localT);

  return `rgb(${r}, ${g}, ${b})`;
};

const GRADIENT_STOPS = ['#FFAE00', '#3CAE66', '#009086'];

const formatDate = (iso: string): string => {
  if (!iso) return '-';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '-';
  }
};

const headerCellSx = {
  color: '#BFBEC2',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  borderBottom: '1px solid rgba(63,63,70,0.5)',
  py: 2,
  px: 3,
  whiteSpace: 'nowrap' as const,
};

// The actions column is pinned right so Join / Waitlist / Leaderboard stay
// reachable when the table scrolls horizontally on narrower screens. A sticky
// cell can't be transparent or the scrolling content shows through, so this is
// the flat equivalent of the container's #142522 over black. It
// deliberately does not follow the row hover — the colour change on a pinned
// column reads as a glitch rather than as feedback.
const STICKY_BG = '#0F1F1C';

const stickyRightSx = {
  position: 'sticky' as const,
  right: 0,
  backgroundColor: STICKY_BG,
  // Hints that content continues underneath once the table scrolls.
  boxShadow: '-8px 0 8px -8px rgba(0,0,0,0.8)',
};

const bodyCellSx = {
  borderBottom: '1px solid rgba(63,63,70,0.3)',
  py: 2.5,
  px: 3,
};

const CohortTable = ({
  cohorts,
  onRowClick,
  actions,
  loading = false,
  emptyMessage = 'No cohorts found.',
}: CohortTableProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 10 }}>
        <CircularProgress size={36} sx={{ color: '#09BA5B' }} />
        <Typography variant="body2" sx={{ color: '#BFBEC2' }}>Loading cohorts...</Typography>
      </Box>
    );
  }

  if (cohorts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10, px: 2 }}>
        {typeof emptyMessage === 'string' ? (
          <Typography variant="body2" sx={{ color: '#BFBEC2' }}>{emptyMessage}</Typography>
        ) : emptyMessage}
      </Box>
    );
  }

  const hasWeeks = cohorts.some((c) => c.weeks !== undefined);
  const hasProgress = cohorts.some((c) => c.completedWeeks !== undefined);
  const hasParticipants = cohorts.some((c) => c.participants !== undefined);
  const hasApplications = cohorts.some((c) => c.applications !== undefined);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerCellSx, maxWidth: 220 }}>Cohort</TableCell>
            <TableCell sx={headerCellSx}>Season</TableCell>
            {hasWeeks && (
              <TableCell sx={{ ...headerCellSx, display: { xs: 'none', sm: 'table-cell' } }}>Weeks</TableCell>
            )}
            {hasProgress && (
              <TableCell sx={{ ...headerCellSx, display: { xs: 'none', sm: 'table-cell' }, minWidth: 160 }}>Progress</TableCell>
            )}
            {hasParticipants && (
              <TableCell sx={{ ...headerCellSx, display: { xs: 'none', sm: 'table-cell' } }}>Participants</TableCell>
            )}
            {hasApplications && (
              <TableCell sx={{ ...headerCellSx, display: { xs: 'none', sm: 'table-cell' } }}>Applications</TableCell>
            )}
            <TableCell sx={{ ...headerCellSx, display: { xs: 'none', md: 'table-cell' } }}>Start Date</TableCell>
            <TableCell sx={{ ...headerCellSx, display: { xs: 'none', md: 'table-cell' } }}>End Date</TableCell>
            {actions && (
              <TableCell sx={{ ...headerCellSx, ...stickyRightSx, zIndex: 3 }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {cohorts.map((cohort) => (
            <TableRow
              key={cohort.id}
              hover
              onClick={() => onRowClick?.(cohort)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': { bgcolor: 'rgba(63,63,70,0.3)' },
                transition: 'background-color 150ms',
              }}
            >
              <TableCell sx={{ ...bodyCellSx, maxWidth: 220 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#F7F7F5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 200,
                  }}
                  title={cohort.name}
                >
                  {cohort.name}
                </Typography>
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <Typography variant="body2" sx={{ color: '#d4d4d8' }}>S{cohort.season}</Typography>
              </TableCell>
              {hasWeeks && (
                <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
                    {cohort.weeks !== undefined ? cohort.weeks : '-'}
                  </Typography>
                </TableCell>
              )}
              {hasProgress && (
                <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', sm: 'table-cell' } }}>
                  {cohort.completedWeeks !== undefined && cohort.weeks ? (
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      {Array.from({ length: cohort.weeks }, (_, i) => {
                        const isCompleted = i < cohort.completedWeeks!;
                        const t = cohort.completedWeeks! > 1 ? i / (cohort.completedWeeks! - 1) : 0;

                        return (
                          <Box
                            key={i}
                            sx={{
                              width: 10,
                              height: 18,
                              borderRadius: '3px',
                              bgcolor: isCompleted ? interpolateColor(t, GRADIENT_STOPS) : '#3f3f46',
                            }}
                          />
                        );
                      })}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#BFBEC2' }}>-</Typography>
                  )}
                </TableCell>
              )}
              {hasParticipants && (
                <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
                    {cohort.participants !== undefined ? cohort.participants : '-'}
                  </Typography>
                </TableCell>
              )}
              {hasApplications && (
                <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: '#d4d4d8' }}>
                    {cohort.applications !== undefined ? cohort.applications : '-'}
                  </Typography>
                </TableCell>
              )}
              <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', md: 'table-cell' } }}>
                <Typography variant="body2" sx={{ color: '#a1a1aa' }}>{formatDate(cohort.startDate)}</Typography>
              </TableCell>
              <TableCell sx={{ ...bodyCellSx, display: { xs: 'none', md: 'table-cell' } }}>
                <Typography variant="body2" sx={{ color: '#a1a1aa' }}>{formatDate(cohort.endDate)}</Typography>
              </TableCell>
              {actions && (
                <TableCell sx={{ ...bodyCellSx, ...stickyRightSx, zIndex: 1 }}>
                  <Box
                    // flex-start, not flex-end: rows carry different numbers of
                    // actions, and right-aligning them leaves the leading icon
                    // at a different x on every row.
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {actions(cohort)}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CohortTable;
