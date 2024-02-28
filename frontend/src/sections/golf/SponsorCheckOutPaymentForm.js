import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { alpha } from '@mui/material/styles';
import { Radio, Stack, RadioGroup, FormControlLabel, Box, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';

import { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
    {
        label: 'Invoice',
        value: 'invoice',
        description: 'Pay later, send me the invoice to this email address.',
    },
    {
        label: 'Credit / Debit',
        value: 'creditcard',
        description: 'We support Mastercard and Visa',
    },
];

// ----------------------------------------------------------------------

export default function SponsorCheckOutPaymentForm() {
    const { control } = useFormContext();

    return (
        <Box sx={{ mt: 4, mb: 6 }}>
            <Controller
                name="paymentMethods.methods"
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        <Grid container spacing={4}>
                            {/* <Stack spacing={3}> */}
                            {PAYMENT_OPTIONS.map((option, index) => (
                                <Grid item key={index} xs={6}>
                                    <OptionItem
                                        option={option}
                                        selected={option.value === field.value}
                                        isCredit={option.value === 'creditcard' && option.value === field.value}
                                        isInvoice={option.value === 'invoice' && option.value === field.value}
                                    />
                                </Grid>
                            ))}

                            {/* </Stack> */}
                        </Grid>
                    </RadioGroup>
                )}
            />
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
                        sx={{ m: 4, width: 400 }}
                    />
                    <LoadingButton size="large" type="submit" variant="contained" sx={{ m: 5 }}>
                        Send Email
                    </LoadingButton>
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
            <LoadingButton size="large" type="submit" variant="contained" sx={{ m: 5 }}>
                Buy
            </LoadingButton>
        </Stack>
    );
}
