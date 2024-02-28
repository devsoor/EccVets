// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from 'src/components/Page';
import { ContactMarketingInfo, ContactMarketingForm, ContactHero } from '../sections/contact';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function Contact() {
    return (
        <Page title="Contact us">
            <RootStyle>
                <ContactHero/>
                <Container
                    sx={{
                        overflow: 'hidden',
                        pt: { xs: 5, md: 10 },
                        pb: { xs: 10, md: 15 },
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 5 }}>
                        Send us a message
                    </Typography>

                    <ContactMarketingForm />
                </Container>
            </RootStyle>
        </Page>
    );
}
