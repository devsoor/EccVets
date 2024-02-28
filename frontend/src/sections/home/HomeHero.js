import { useState } from 'react';
import ReactPlayer from 'react-player';

import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Grid, Container, Typography, Stack, Modal, Fade } from '@mui/material';
// routes
import { HOME_IMAGES } from '../../assets/images/images';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';
import { AppFeatured } from '../@dashboard/general/app';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.grey[400],
    [theme.breakpoints.up('md')]: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
    },
}));

const ContentStyle = styled(props => <Stack spacing={5} {...props} />)(({ theme }) => ({
    zIndex: 10,
    // border: "2px solid red",
    maxWidth: 660,
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        margin: 'unset',
        textAlign: 'left',
    },
}));
const ContentStyle2 = styled(props => <Stack spacing={5} {...props} />)(({ theme }) => ({
    zIndex: 10,
    // border: "2px solid red",
    maxWidth: 660,
    height: '100%',
    margin: 'auto',
    // textAlign: 'center',
    position: 'relative',
    alignItems: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        margin: 'unset',
        textAlign: 'left',
    },
}));

const HeroOverlayStyle = styled(m.img)(({ theme }) => ({
    zIndex: 9,
    width: '100%',
    height: '100%',
    // objectFit: 'cover',
    position: 'absolute',
    // filter: 'brightness(20%)',
}));

const VideoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// ----------------------------------------------------------------------

export default function HomeHero() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleWatchVideo = () => {
        setOpen(true);
    };
    return (
        <MotionContainer>
            <RootStyle>
                <HeroOverlayStyle alt="overlay" src="/assets/icons/flags/flag_us_light.jpg" variants={varFade().in} />

                <Container>
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <ContentStyle>
                                <m.div variants={varFade().inRight}>
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                        Veterans Club at Encanterra
                                    </Typography>
                                </m.div>
                                <m.div variants={varFade().inRight}>
                                    {/* <Stack direction="row"> */}
                                        <Typography variant="h4" sx={{ color: 'primary.light' }}>
                                        Support for our Heroes
                                            {/* <Typography component="span" variant="h4" sx={{ color: 'primary.light' }}>
                                                Encanterra
                                            </Typography> */}
                                        </Typography>
                                    {/* </Stack> */}
                                </m.div>

                                <m.div variants={varFade().inRight}>
                                    <Typography variant="h6">
                                        Contributing to the welfare of local veterans and organizations that support
                                        them
                                    </Typography>
                                </m.div>

                                <Stack spacing={2.5}>
                                    <m.div variants={varFade().inRight}>
                                        <Button
                                            size="large"
                                            variant="contained"
                                            onClick={handleWatchVideo}
                                            startIcon={<Iconify icon={'eva:video-fill'} width={40} height={40} />}
                                            sx={{ backgroundColor: 'secondary.main', mt: 4, p: 4 }}
                                        >
                                            Watch
                                        </Button>
                                        <Modal open={open} onClose={handleClose} closeAfterTransition>
                                            <Fade in={open}>
                                                <Box sx={VideoStyle}>
                                                    <ReactPlayer
                                                        url="/assets/video/nfm_salute_-_october_2022_-_dick_pard_petty_officer_2nd_class_u.s._navy-240p-2.mp4"
                                                        className="react-player"
                                                        width="100%"
                                                        height="100%"
                                                        controls
                                                        playing
                                                    />
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    </m.div>
                                    <m.div variants={varFade().inRight}>
                                        <Typography variant="body2">
                                            Club Member - Richard Pard - Honored by NFM Funding For His Service
                                        </Typography>
                                    </m.div>
                                </Stack>
                            </ContentStyle>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ContentStyle2>
                                <AppFeatured list={HOME_IMAGES} />
                                <m.div variants={varFade().inRight}>
                                    <Typography variant="h6" sx={{  mb: 2 }}>
                                        A Few Portraits of our Members
                                    </Typography>
                                    <Typography variant="body1">
                                        Our "Band of Brothers and Sisters". We served and continue to serve Our Country
                                        and Our Brothers and Sisters in Need.
                                    </Typography>
                                </m.div>
                            </ContentStyle2>
                        </Grid>
                    </Grid>
                </Container>
            </RootStyle>
            <Box sx={{ height: { md: '100vh' } }} />
        </MotionContainer>
    );
}
