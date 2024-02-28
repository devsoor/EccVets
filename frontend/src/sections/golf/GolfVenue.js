import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionContainer, varFade } from 'src/components/animate';

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

export default function GolfVenue() {
    return (
        <RootStyle>
            <Container component={MotionContainer}>
                <m.div variants={varFade().inRight}>
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        The Venue
                    </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        Encanterra County Club boasts a Tom Lehmann designed championship golf course with panoramic
                        views of both the Superstition and San Tan Mountains. At 7,176 yards, this stunning course
                        provides challenges for golfers of all levels and abilities. Named among the Top Ten New Courses
                        in 2008, Encanterra has hosted some of the Valley's premier golf events, including The Gateway
                        Tour Championship, The LGAA Thunderbirds Classic and sectional qualifying rounds for both the US
                        Open and US Senior Open.
                    </Typography>
                </m.div>
            </Container>
        </RootStyle>
    );
}
