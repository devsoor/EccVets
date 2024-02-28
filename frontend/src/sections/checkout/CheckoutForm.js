import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { PaymentElement, useStripe, useElements, LinkAuthenticationElement } from '@stripe/react-stripe-js';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

// import { PATH_PAGE } from '../../routes/paths';

import { fCurrency } from '../../utils/formatNumber';

// import { sendEmail, getEvent } from 'src/libs/api';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
    },
}));

export default function CheckoutForm(props) {
    const { id, price, clientSecret, emailAddress, onPaymentDone } = props;
    // const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    // const [order, setOrder] = useState();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const fetchOrder = async (id) => {
    //     const order = await getEvent(id);
    //     console.log("order = ", order)
    //     setOrder(order);
    // }

    // useEffect(() => {
    //     console.log("orderID = ", orderID)

    //     if (orderID.split("#")[0] === 'EVENT') {
    //         fetchOrder(orderID.split("#")[1]);
    //     }
    // }, []);

    const submitPayment = async () => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: 'http://localhost:3030',
                    receipt_email: email
                  },
                redirect: 'if_required',
            })
            .then(async response => {
                if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                    enqueueSnackbar('Payment succeeded!');
                    // const emailParams = {
                    //     emailAddress: email,
                    //     // orderID,
                    //     type: id
                    // }
                    // await sendEmail(id, emailParams);
                    // setIsLoading(false);
                    // navigate(PATH_PAGE.paymentComplete);
                    onPaymentDone();
                } else if (response.error) {
                    if (response.error.type === 'card_error' || response.error.type === 'validation_error') {
                        setMessage({ message: response.error.message, severity: 'error' });
                    } else {
                        setMessage({ message: 'An unexpected error occurred.', severity: 'error' });
                    }
                    // setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
                // setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <>
            {clientSecret && (
                <RootStyle>
                    <Container>
                        <Card sx={{mb: 4}}>
                            <CardHeader title="Order Details" />
                            <CardContent>
                                <Typography variant="subtitle2" sx={{ color: 'info.main', mb: 2 }}>
                                    {fCurrency(price)} for {id} will be charged to your account
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'error.main', mb: 2 }}>
                                    NOTE: All transactions are final and non-refundable
                                </Typography>
                                <Typography sx={{mt: 4}}>Receipt will be sent to this email address:</Typography>
                                <LinkAuthenticationElement
                                    id="link-authentication-element"
                                    options={{defaultValues: {email: emailAddress}}}
                                    onChange={(e) => setEmail(e.value.email)}
                                />
                                <PaymentElement options={paymentElementOptions} />
                            </CardContent>

                            {message && <Alert severity={message.severity}>{message.message}</Alert>}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                                {/* <Button
                                    size="large"
                                    color="inherit"
                                    onClick={onBackStep}
                                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
                                >
                                    Back
                                </Button> */}
                                <LoadingButton
                                    loading={isLoading}
                                    size="large"
                                    vairiant="contained"
                                    onClick={submitPayment}
                                    sx={{ backgroundColor: 'primary.main', color: 'white' }}
                                    // startIcon={<Iconify icon={'eva:arrow-forward-fill'} />}
                                >
                                    Submit Order
                                </LoadingButton>
                            </Box>
                    </Card>
                </Container>
                </RootStyle>
            )}
        </>
    );
}
