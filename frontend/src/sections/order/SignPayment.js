import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Backdrop, CircularProgress, Box, Container, Typography, Grid, Stack, Divider } from '@mui/material';

import { FormProvider, RHFTextField, RHFSelect, RHFSwitch } from 'src/components/hook-form';
import Incrementer from 'src/utils/Incrementer';
import { fCurrency, fPercent } from '../../utils/formatNumber';
import { PATH_PAGE } from 'src/routes/paths';
import { ROLES } from 'src/config';

import { createVeteranSignBuyer, sendEmail, getProducts } from 'src/libs/api';

import { BillingForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

export default function SignPayment() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [products, setProducts] = useState();
    const [price, setPrice] = useState();
    const [defaultPrice, setDefaultPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [readyPayment, setReadyPayment] = useState(null);

    const id = "Veteran Sign";

    const SignOrderSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }),
        inscription: Yup.string().max(80),
        role: Yup.string().required('Role is required'),
    });

    const defaultValues = {
        billingAddress: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: 'Arizona',
            zipCode: '',
        },
        inscription: '',
        quantity: 1,
        role: 'Veteran',
        renewal: false,
    };

    const methods = useForm({
        resolver: yupResolver(SignOrderSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await getProducts('sign');
        setProducts(response[0]);
        setPrice(response[0].price);
        setDefaultPrice(response[0].price);
        setIsLoading(false);
    }
    
    useEffect(() => {
        setReadyPayment(null);
        fetchProducts();
    }, []);


    const handlePaymentDone = async () => {
        readyPayment["price"] = price;
        const params = {
            type: readyPayment.role.toUpperCase(),
            billingAddress: readyPayment.billingAddress,
            price,
            quantity: readyPayment.quantity,
            appearName: readyPayment.inscription,
            renewal: readyPayment.renewal
        };
        const orderID = await createVeteranSignBuyer(params);
        // const orderData = `ORDER:${orderID.data}`;
        const emailParams = {
		    emailAddress: readyPayment.billingAddress.emailAddress,
		    orderID: `ORDER:${orderID.data}`,
		    type: id
		}
		await sendEmail(id, emailParams);
		navigate(PATH_PAGE.paymentComplete);
    };

    const onSubmit = async data => {
        setReadyPayment(data);
    }

    // const handleIncrementQty = () => {
    //     setValue('quantity', values.quantity + 1);
    //     setPrice(price+defaultPrice);
    // }
    // const handleDecrementQty = () => {
    //     setValue('quantity', values.quantity - 1);
    //     setPrice(price-defaultPrice);
    // }

    // const handleRenewal = (e) => {
    //     console.log("e = ", e.target.checked)
    //     // setValue("renewal", !renewal)
    // }

    return <>
    		{readyPayment ? <SetupPayment
				id={id}
				price={price}
				emailAddress={readyPayment.billingAddress.emailAddress}
				onPaymentDone={handlePaymentDone}
			/>
			:
        <RootStyle>
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Container>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <Stack>
                                <StepLabel title="I am a ..." step="1" />
                                <RHFSelect
                                    name="role"
                                    // label="Role"
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    sx={{
                                        maxWidth: 400,
                                    }}
                                >
                                    {ROLES.map((option) => (
                                        <option key={option.name} value={option.name}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>

                                <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

                                <StepLabel title="Billing Information" step="2" />

                                <BillingForm/>

                                <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

                                <StepLabel title="Sign Inscription" step="3" />
                                <RHFSwitch name="renewal" label="This is a renewal"/>

                                <RHFTextField
                                    name="inscription"
                                    label="Inscription (Maximum 80 characters or the print will be very small). Personal messages only, no advertising"
                                />
                                {/* <Stack direction="row" justifyContent="flex-start" sx={{ mt: 3 }}>
                                    <Typography variant="subtitle1" sx={{ mt: 0.5, mr: 4 }}>
                                        Quantity
                                    </Typography>

                                    <div>
                                        <Incrementer
                                            name="quantity"
                                            quantity={values.quantity}
                                            onIncrementQuantity={handleIncrementQty}
                                            onDecrementQuantity={handleDecrementQty}
                                        />
                                    </div>
                                </Stack> */}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={3} sx={{ pl: 4, mt: 4 }}>
                            {products && <Stack
                                spacing={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                                }}
                            >
                                <Typography variant="h6"> Order Summary </Typography>

                                <Stack spacing={2}>
                                    <Row label="Subtotal" value={fCurrency(price)} />
                                    {/* <Row label="Tax" value={fPercent(0)} /> */}
                                </Stack>

                                <Divider sx={{ borderStyle: 'dashed' }} />

                                <Row
                                    label="Total"
                                    value={fCurrency(price)}
                                    sx={{
                                        typography: 'h6',
                                        '& span': { typography: 'h6' },
                                    }}
                                />

                                <LoadingButton size="large" variant="contained" type="submit" loading={isLoading}>
                                    Proceed to Payment
                                </LoadingButton>
                            </Stack>
                            }
                        </Grid>
                    </Grid>
                </FormProvider>
            </Container>
        </RootStyle>
    }
    </>
}

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