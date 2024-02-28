import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';

import { GolfPlayerForm, PlayerRegistrationHero } from '../sections/golf';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function GolfPlayer() {
    return (
        <Page title="Golf Player">
            <RootStyle>
                <PlayerRegistrationHero />
                <GolfPlayerForm/>
            </RootStyle>
        </Page>
    );
}
