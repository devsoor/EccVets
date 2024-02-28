import React from 'react';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { SignHero, SignPayment, SignContent } from '../sections/order';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

const OrderSign = () => {
    return (
        <Page title="Support Sign">
            <RootStyle>
                <SignHero />
                <SignContent />
                <SignPayment />
            </RootStyle>
        </Page>
    );
};

export default OrderSign;
