import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { createPaymentIntent } from '../libs/api';
import { CheckoutForm } from '../sections/checkout';
import Page from '../components/Page';

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function SetupPayment({ id, price, emailAddress, onPaymentDone }) {
    // console.log("SetupPayment: id = ", id, ", price = ", price, ", emailAddress = ", emailAddress)
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getClientSecret(total) {
            try {
                // call API to create paymentIntent and get client secret for this transaction
                const clientSecret = await createPaymentIntent({ amount: total });
                if (clientSecret) {
                    setClientSecret(clientSecret);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getClientSecret(price * 100);
    }, []);

    const appearance = {
        theme: 'stripe',
        labels: 'floating'

    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Page title="Payment">
            <RootStyle>
                {/* <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                    <CircularProgress color="primary" />
                </Backdrop> */}
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                            id={id}
                            price={price}
                            clientSecret={clientSecret}
                            emailAddress={emailAddress}
                            onPaymentDone={onPaymentDone}
                        />
                    </Elements>
                )}
            </RootStyle>
        </Page>
    );
}
