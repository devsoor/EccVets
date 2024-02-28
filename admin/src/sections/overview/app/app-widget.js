import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWidget({ title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      textAlign='center'
      width={1}
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
        bgcolor: `${color}.dark`,
        ...sx,
      }}
      {...other}
    >
      {/* <Chart type="radialBar" series={[series]} options={chartOptions} width={86} height={86} /> */}

      <ListItemText
        sx={{ ml: 3 }}
        primary={fNumber(total)}
        secondary={title}
        primaryTypographyProps={{
          typography: 'h4',
          component: 'span',
        }}
        secondaryTypographyProps={{
          color: 'inherit',
          component: 'span',
          sx: { opacity: 0.64 },
          typography: 'subtitle2',
        }}
      />

      <Iconify
        icon={icon}
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </Stack>
  );
}