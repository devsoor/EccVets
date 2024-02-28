import React from 'react';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { ShirtHero, ShirtContent, ShirtAbout, ShirtPayment } from '../sections/order';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

const OrderShirt = () => {
    return (
        <Page title="Red Shirt">
            <RootStyle>
                <ShirtHero />
                <ShirtContent />
                {/* <ShirtAbout /> */}
                <ShirtPayment />
            </RootStyle>
        </Page>
    );
};

export default OrderShirt;
