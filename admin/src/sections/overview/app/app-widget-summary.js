import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fNumber, fPercent } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import Chart from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, sx, ...other }) {

  return (
    <Card sx={{  p: 3, ...sx }} {...other}>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle2">{title}</Typography>

          {/* <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Iconify
              width={24}
              icon={
                percent < 0
                  ? 'solar:double-alt-arrow-down-bold-duotone'
                  : 'solar:double-alt-arrow-up-bold-duotone'
              }
              sx={{
                mr: 1,
                color: 'success.main',
                ...(percent < 0 && {
                  color: 'error.main',
                }),
              }}
            />

            <Typography component="div" variant="subtitle2">
              {percent > 0 && '+'}

              {fPercent(percent)}
            </Typography>
          </Stack> */}

          <Typography variant="h3">{fNumber(total)}</Typography>

        </Stack>
        {/* </Box> */}

      {/* <Chart type="bar" series={[{ data: series }]} options={chartOptions} width={60} height={36} /> */}
    </Card>
  );
}
