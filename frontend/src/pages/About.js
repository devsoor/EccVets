// @mui
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
import { AboutHistory, AboutHero, AboutTeam } from '../sections/about';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function About() {
    return (
        <Page title="About us">
            <RootStyle>
                <AboutHero />
                <AboutHistory />

                {/* <AboutTeam /> */}
            </RootStyle>
        </Page>
    );
}
