import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// utils
import { fCurrency } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

export default function AppEvent({ title, tableData, tableLabels, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppEventRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}


// ----------------------------------------------------------------------

function AppEventRow({ row }) {
  return (
    <>
      <TableRow>
        <TableCell>{row.title}</TableCell>

        <TableCell>{fDateTime(row.start)}</TableCell>
        <TableCell>{fDateTime(row.end)}</TableCell>

        <TableCell>{fCurrency(row.extendedProps.cost)}</TableCell>

        <TableCell>
          <Label
            color={row.extendedProps.allowSponsor === true ? 'success' : 'error'}
            sx={{display: 'flex', justifyContent: 'center',}}
          >
            {row.extendedProps.allowSponsor === true ? "Yes" : "No"}
          </Label>
        </TableCell>
        <TableCell>
          <Label
            color={row.extendedProps.allowVeteran === true ? 'success' : 'error'}
            sx={{display: 'flex', justifyContent: 'center'}}

          >
            {row.extendedProps.allowVeteran === true ? "Yes" : "No"}
          </Label>
        </TableCell>
        <TableCell>
          <Label
            color={row.extendedProps.allowCommunity === true ? 'success' : 'error'}
            sx={{display: 'flex', justifyContent: 'center'}}

          >
            {row.allowCommunity === true ? "Yes" : "No"}
          </Label>
        </TableCell>

        <TableCell>{row.extendedProps.category}</TableCell>

      </TableRow>

    </>
  );
}

AppEventRow.propTypes = {
  row: PropTypes.object,
};
