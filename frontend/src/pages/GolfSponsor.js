import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';

import { GolfSponsorForm, SponsorshipPackagesHero } from '../sections/golf';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function GolfSponsor() {
    return (
        <Page title="Golf Sponsor">
            <RootStyle>
                <SponsorshipPackagesHero />
                <GolfSponsorForm/>
            </RootStyle>
        </Page>
    );
}
