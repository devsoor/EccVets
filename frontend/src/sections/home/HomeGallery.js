import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
import Iconify from 'src/components/Iconify';

// components
import Image from 'src/components/Image';
import { MotionViewport, varFade } from 'src/components/animate';
import { AppFeatured } from '../@dashboard/general/app';
import { HOME_GALLERY } from '../../assets/images/gallery';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(6),
    },
}));

// ----------------------------------------------------------------------

export default function HomeGallery() {
    const theme = useTheme();

    return (
        <RootStyle>
            <Container component={MotionViewport}>
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    <m.div variants={varFade().inUp}>
                        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                            Events
                        </Typography>
                    </m.div>
                    <m.div variants={varFade().inDown}>
                        <Typography variant="h2">Our year around social and charity events</Typography>
                    </m.div>
                    <Box sx={{ p: 2, ml: 6 }}>
                        <AppFeatured list={HOME_GALLERY} />
                        {/* <Box> */}
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={4}
                            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                        >
                            <Typography variant="body1">See more Photos in our Gallery</Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: 'primary.main' }}
                                endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} />}
                            >
                                Go to Gallery
                            </Button>
                        </Stack>
                    </Box>
                    {/* </Box> */}
                </Box>
            </Container>
        </RootStyle>
    );
}
