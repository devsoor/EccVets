import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, alpha } from '@mui/material/styles';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function ProfileCover({ person }) {
  const theme = useTheme();
  const name = `${person.fullName}`
  const role = person.PK;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.dark, 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        height: 160,
        color: 'common.white',
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant='h2'>{name}</Typography>
      <Typography variant='body2'>{role}</Typography>
      {/* <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 10 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            mb: 12,
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h3',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.90 },
          }}
        />
      </Stack> */}
    </Box>
  );
}
