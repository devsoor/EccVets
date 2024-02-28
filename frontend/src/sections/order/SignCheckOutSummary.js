import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Stack, Divider, Typography, TextField, Box, IconButton } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../utils/formatNumber';
// components
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function SignCheckOutSummary({ tax, total, subtotal, shipping, discount, products, loading }) {
    return (
        <Stack
            spacing={3}
            sx={{
                p: 2,
                borderRadius: 2,
                border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            }}
        >
            <Typography variant="h6"> Order Summary </Typography>

            {/* {!!products?.length && (
                <>
                    {products.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}

                    <Divider sx={{ borderStyle: 'dashed' }} />
                </>
            )} */}

            <Stack spacing={2}>
                <Row label="Subtotal" value={fCurrency(subtotal)} />
                <Row label="Tax" value={fPercent(tax)} />
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Row
                label="Total"
                value={fCurrency(total)}
                sx={{
                    typography: 'h6',
                    '& span': { typography: 'h6' },
                }}
            />

            <LoadingButton size="large" variant="contained" color="inherit" type="submit" loading={loading}>
                Order Now
            </LoadingButton>
        </Stack>
    );
}

// ----------------------------------------------------------------------

function ProductItem({ product, ...other }) {
    return (
        <Stack direction="row" alignItems="flex-start" {...other}>
            <Image
                src={product.coverImg}
                sx={{
                    mr: 2,
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    borderRadius: 1.5,
                    bgcolor: 'background.neutral',
                }}
            />

            <Stack flexGrow={1}>
                {/* <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}> */}
                {product.name}
                {/* </TextMaxLine> */}

                <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
                    {fCurrency(product.price)}
                </Typography>

                <TextField
                    select
                    size="small"
                    variant="outlined"
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ width: 80 }}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
            </Stack>

            <IconButton>
                <Iconify icon="carbon:trash-can" />
            </IconButton>
        </Stack>
    );
}

ProductItem.propTypes = {
    product: PropTypes.shape({
        coverImg: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
    }),
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'subtitle2', ...sx }}
            {...other}
        >
            <Box component="span" sx={{ typography: 'body2' }}>
                {label}
            </Box>
            {value}
        </Stack>
    );
}

Row.propTypes = {
    label: PropTypes.string,
    sx: PropTypes.object,
    value: PropTypes.string,
};
