import { useLocation, Outlet } from 'react-router-dom';
// @mui
import { Box, Link, Container, Typography, Stack, Grid } from '@mui/material';
// components
import { Mailto } from 'src/components/Mailto';
//
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

export default function MainLayout() {
    const { pathname } = useLocation();

    const isHome = pathname === '/';

    return (
        <Stack sx={{ minHeight: 1 }}>
            <MainHeader />

            <Outlet />

            <Box sx={{ flexGrow: 1 }} />

            {/* {!isHome ? (
        <MainFooter />
      ) : ( */}
            <Box
                sx={{
                    py: 5,
                    textAlign: 'center',
                    position: 'relative',
                    bgcolor: 'primary.main',
                    color: 'common.white',
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: 'flex', justifyContent: {xs: 'center', md: 'space-around'}, alignItems: 'flex-start' }}
                        >
                            <Stack>
                                {/* <Logo disabledLink white="true" sx={{ mb: 1, mx: 'auto' }} /> */}
                                <Typography variant="body2" component="p">
                                    © Veterans Club at Encanterra | All rights reserved
                                    {/* <br />
                                    &nbsp; Veterans Club at Encanterra */}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: 'flex', justifyContent: {xs: 'center', md: 'space-around'}, alignItems: 'flex-start' }}
                        >
                            {/* <Stack direction="row" spacing={4}> */}
                                {/* <Typography variant="h6" sx={{ mb: 2 }}>
                                    Contact us:
                                </Typography> */}
                                <Stack sx={{ textAlign: 'left' }}>
                                    <Typography variant="subtitle2">Golf Event Info</Typography>
                                    <Mailto email="events@eccvets.org">
                                        <Typography variant="subtitle2"  sx={{color: "yellow"}}>
                                        events@eccvets.org
                                        </Typography>
                                    </Mailto>
                   
                                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                        Membership Info
                                    </Typography>
                                    <Mailto email="info@eccvets.org">
                                        <Typography variant="subtitle2"  sx={{color: "yellow"}}>
                                        info@eccvets.org
                                        </Typography>
                                    </Mailto>
                                </Stack>
                            {/* </Stack> */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            {/* )} */}
        </Stack>
    );
}
