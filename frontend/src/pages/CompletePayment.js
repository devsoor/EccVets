// @mui
import { styled } from '@mui/material/styles';

import { Box, Typography, } from '@mui/material';

// assets
import OrderCompleteIllustration from '../assets/illustration_order_complete';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));
// ----------------------------------------------------------------------

export default function CompletePayment() {

    return <RootStyle>
        <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" paragraph>
                    Thank you for your purchase!
                </Typography>

                <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

                <Typography align="left" sx={{ color: 'text.secondary' }}>
                    Receipt has been sent to your email address.
                </Typography>
            </Box>
        </Box>

    </RootStyle>
}
