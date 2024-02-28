import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';

import {
    Grid,
    Link,
    Container,
    Typography,
} from '@mui/material';
import { PATH_PAGE } from 'src/routes/paths';
import useResponsive from 'src/hooks/useResponsive';

// components
import { MotionViewport, varFade } from 'src/components/animate';
import { AppFeatured } from '../@dashboard/general/app';
import { HOME_CHARITY } from '../../assets/images/charity';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(6),
    },
}));
// ----------------------------------------------------------------------

export default function HomeCharity() {
    const upMd = useResponsive('up', 'md');

    return (
        <RootStyle>
            <Container component={MotionViewport} sx={{ position: 'relative', textAlign: 'center' }}>
                <m.div variants={varFade().inUp}>
                    <Typography variant="h2" sx={{ mb: 3 }}>
                        Our 2023 Charity Golf Event
                    </Typography>
                </m.div>

                <m.div variants={varFade().inUp}>
                    <Typography
                        sx={{
                            color: theme => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'),
                        }}
                    >
                        Most Successful Event Yet !!!!
                    </Typography>
                </m.div>

                <Container sx={{ mt: 4 }}>
                    <Grid container spacing={2} alignItems={{ md: 'flex-start' }} justifyContent={{ md: 'space-between' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 3, textAlign: upMd ? 'justify' : 'center'}}>
                            In 2023, The Veterans Club at Encanterra, a 501(c)(3) corporation, raised over $100,000 
                            with the support of our sponsors, golfers, donors and community. We could not have done it 
                            without YOU. Those Charities are:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <AppFeatured list={HOME_CHARITY} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                2021-2022 check presentations to Veterans First LTD and HOHP
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={7} sx={{textAlign: upMd ? 'left' : 'center'}}>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                Veterans First LTD
                                <Typography variant="body2" sx={{ color: 'text.secondary'}}>
                                Helping homeless Arizona veterans with assistance in finding affordable housing, 
                                referrals, resources and information to improve their lives. 
                                </Typography>
                            </Typography>

                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 3 }}>
                                Honoring/Hiring/Helping Our Heroes of Pinal County
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Supporting the veterans and their families of Pinal County. Their focus is fostering independence 
                            and enabling self-esteem through a “hand up” approach. HOHP also provides transitional housing and training for Pinal County veterans.
                            </Typography>

                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 3 }}>
                                Honor Flight
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                Pays homage to WWII, Korean War and Vietnam War Veterans by providing a three-day journey of 
                                honor and remembrance to their respective memorials in Washington D.C.
                                {/* <br/> */}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic'}}>
                                    “It was an unbelievable experience. I finally got the 'welcome home' I never had”
                                </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary'}}>- Honor Flight recipient</Typography>
                            </Typography>

                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 3 }}>
                                Veterans Scholarship Program
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                In conjunction with Central Arizona College scholarships are provided for veterans and their families. 
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mb: 8, textAlign: 'left'}}>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mt: 3 }}>
                                Our 2024 Golf Event
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3}}>
                                Our May 4th, 2024 Charity Golf Event is already taking shape. New ideas and fun projects are in 
                                the works. We're counting on you to help us raise even more funds for these charities.  
                                <Typography component="span" sx={{ml: 1}}>
                                    Please visit our
                                </Typography>
                                <Typography component="span" sx={{ml: 1, mr: 1}}>
                                    <a href={PATH_PAGE.event.list}>Events</a>
                                </Typography>
                                <Typography component="span">
                                    tab for sponsorship. For donations visit our 
                                </Typography>
                                <Typography component="span"  sx={{ml: 1, mr: 1}}>
                                    <a href={PATH_PAGE.donate}>Donate</a>
                                </Typography>
                                <Typography component="span">
                                    tab. 
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </RootStyle>
    );
}
