import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PATH_PAGE } from '../../routes/paths';

// components
import { MotionContainer, varFade } from 'src/components/animate';
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';

import img1 from '../../assets/gallery/img - 243.png';
import img2 from '../../assets/gallery/img - 245.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

// ----------------------------------------------------------------------

export default function GolfChallenge() {
    return (
        <RootStyle>
            <Container component={MotionContainer}>
                <m.div variants={varFade().inRight}>
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Our Present Challenge
                    </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                    <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                        Arizona is among the top five states with the highest concentration of veterans. Nearly one of
                        five are disabled and growing number are homeless. Proceeds from our 2023 Golf Event will
                        benefit the following four Phoenix area veteran's support organizations.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Veterans First LTD
                    </Typography>
                    <Grid container sx={{ mb: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                                Preventing homelessness and stabilizing the lives of our Women Veterans while providing
                                referrals, resources and information to all Veterans, their families and caregivers.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={img1} disabledEffect sx={{ borderRadius: 1, ml: 4, width: 300 }} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 4 }}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                HOHP
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                                <b>HOHP</b> stands for <b>Honoring/Hiring/Helping Our Heroes of Pinal County</b>.{' '}
                                <b>HOHP</b> helps to ensure that the Veterans and Military families of Pinal County have
                                the resources needed without leaving the county. <b>HOHP's</b> focus is on a "hands up"
                                approach to our local veterans with transitional housing and career training.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={img2} disabledEffect sx={{ borderRadius: 1, ml: 4, width: 300 }} />
                        </Grid>
                    </Grid>
                    <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                        <b>Honor Flight (AZ)</b> pays homage to WWII, Korean War and Vietnam War veterans by providing a
                        three day journey of honor and remembrance to their memorials in Washington DC. Also,{' '}
                        <b>Honor Flight (AZ)</b> sponsors educational programs that educate young people on the impact
                        of these wars.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Scholarship Program
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                        In conjunction with the Central Arizona College, we have inaugurated a scholarship program for
                        local veterans in to learn employable skills and trades. The scholarship is designed to
                        supplement VA benefits.
                    </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 10 }}>
                        <Button
                            component={RouterLink}
                            variant="outlined"
                            color="inherit"
                            size="large"
                            endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} />}
                            to={PATH_PAGE.golf.playerRegistration}
                        >
                            Please Join Us for Our 2023 Golf Event
                        </Button>
                    </Box>
                </m.div>
            </Container>
        </RootStyle>
    );
}
