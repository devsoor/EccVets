import PropTypes from 'prop-types';
import { Box, Container, Typography, Grid, Stack, Divider, IconButton } from '@mui/material';
import Iconify from 'src/components/Iconify';

Incrementer.propTypes = {
    available: PropTypes.number,
    quantity: PropTypes.number,
    onIncrementQuantity: PropTypes.func,
    onDecrementQuantity: PropTypes.func,
};

export default function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
    return (
        <Box
            sx={{
                py: 0.5,
                px: 0.75,
                border: 1,
                lineHeight: 0,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                borderColor: 'grey.50032',
            }}
        >
            <IconButton size="small" color="inherit" disabled={quantity < 1} onClick={onDecrementQuantity}>
                <Iconify icon={'eva:minus-fill'} width={14} height={14} />
            </IconButton>

            <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
                {quantity}
            </Typography>

            <IconButton size="small" color="inherit" onClick={onIncrementQuantity}>
                <Iconify icon={'eva:plus-fill'} width={14} height={14} />
            </IconButton>
        </Box>
    );
}
