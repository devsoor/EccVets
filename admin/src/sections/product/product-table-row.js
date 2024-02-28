import PropTypes from 'prop-types';
import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// utils
import { fCurrency } from 'src/utils/format-number';
// hooks
import { fDate } from 'src/utils/format-time';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  row
}) {
  const {
    id,
    type,
    price,
    features,
    image,
  } = row;

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={id}
            src={image || ''}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <ListItemText
            primary={
              <Typography
                noWrap
                color="inherit"
                variant="subtitle2"
              >
                {id}
              </Typography>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {type}
              </Box>
            }
          />
        </TableCell>

        <TableCell>{fCurrency(price)}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
            {features && <ListItemText
              primary={features.map((feature, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                >
                  {feature.name}
                </Typography>
              ))}
              />
            }

        </TableCell>
      </TableRow>
    </>
  );
}

ProductTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
