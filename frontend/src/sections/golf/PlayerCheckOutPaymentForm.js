import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { alpha } from '@mui/material/styles';
import { Radio, Stack, FormControlLabel, Box, Grid, Button } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
    // {
    //     label: 'Invoice',
    //     value: 'invoice',
    //     description: 'Pay later, send me the invoice to this email address.',
    // },
    {
        label: 'Credit / Debit',
        value: 'creditcard',
        description: 'We support Mastercard and Visa',
    },
];

// ----------------------------------------------------------------------

export default function PlayerCheckOutPaymentForm() {
    const { control } = useFormContext();

    return (
        <Box sx={{ mt: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <NewCardForm/>
                </Grid>
            </Grid>

        </Box>

    );
}

// ----------------------------------------------------------------------

function OptionItem({ option, isCredit, isInvoice, selected }) {
    const { value, label, description } = option;

    const renderLabel = (
        <Stack direction="row" alignItems="center">
            <Stack spacing={0.5} flexGrow={1}>
                <Box component="span" sx={{ typography: 'subtitle1' }}>
                    {label}
                </Box>

                <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
                    {description}
                </Box>
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
                {value === 'creditcard' ? (
                    <>
                        <Iconify icon="logos:mastercard" width={24} />,
                        <Iconify icon="logos:visa" width={24} />
                    </>
                ) : (
                    <Iconify icon="mdi:invoice-outline" color="info.main" width={24} />
                )}
            </Stack>
        </Stack>
    );

    return (
        <Box
            sx={{
                borderRadius: 1,
                border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                ...(selected && {
                    boxShadow: theme => `0 0 0 2px ${theme.palette.text.primary}`,
                }),
            }}
        >
            <FormControlLabel
                value={value}
                control={
                    <Radio
                        disableRipple
                        checkedIcon={<Iconify width={24} icon="carbon:checkmark-outline" />}
                        sx={{ mx: 1 }}
                    />
                }
                label={renderLabel}
                sx={{
                    m: 0,
                    py: 2,
                    pr: 2.5,
                    width: 1,
                    '& .MuiFormControlLabel-label': {
                        width: 1,
                    },
                }}
            />

            {isCredit && <NewCardForm />}
            {isInvoice && (
                <Stack spacing={2} sx={{ m: 4 }}>
                    <RHFTextField
                        name="paymentMethods.invoice.emailAddress"
                        label="Email Address"
                        placeholder="JOHN DOE"
                        sx={{ m: 4, width: 400 }}
                    />
                    <Button size="large" variant="contained" sx={{ m: 5 }}>
                        Send Email
                    </Button>
                </Stack>
            )}
        </Box>
    );
}

OptionItem.propTypes = {
    isCredit: PropTypes.bool,
    option: PropTypes.shape({
        description: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
    }),
    selected: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NewCardForm() {
    return (
        <Stack spacing={2.5} sx={{ px: 3, pb: 3 }}>
            <RHFTextField name="paymentMethods.card.cardNumber" label="Card Number" placeholder="XXXX XXXX XXXX XXXX" />

            <RHFTextField name="paymentMethods.card.cardHolder" label="Card Holder" placeholder="JOHN DOE" />

            <Stack spacing={2} direction="row">
                <RHFTextField name="paymentMethods.card.expirationDate" label="Expiration Date" placeholder="MM/YY" />
                <RHFTextField name="paymentMethods.card.ccv" label="CVV/CVC" placeholder="***" />
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ typography: 'caption', color: 'text.disabled' }}>
                <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
                Your transaction is secured with SSL encryption
            </Stack>
            <Button size="large" variant="contained" sx={{ m: 5 }}>
                Buy
            </Button>
        </Stack>
    );
}
