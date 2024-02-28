import { styled } from '@mui/material/styles';
import Page from '../components/Page';

import { DonatePayment, DonateHero } from '../sections/donate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function Donate() {
    return (
        <Page title="Donate">
            <RootStyle>
                <DonateHero />
                <DonatePayment/>
            </RootStyle>
        </Page>
    );
}
