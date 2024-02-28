// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, Button } from '@mui/material';
import Image from 'src/components/Image';

import shirtImage from '../../assets/images/redShirt.jpg';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

export default function ShirtAbout() {
    return (
        <RootStyle>
            <Container sx={{ mb: 2 }}>
                <Typography variant="h3" align="center" paragraph sx={{ mb: 6 }}>
                    Order your Red Shirt now
                </Typography>

                <Grid container sx={{ mb: 4 }}>
                    <Grid item xs={12} md={8}>
                        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                            Our red Shirts come in a wide range of Men and Women sizes. 
                            <br />
                            <br />
                            They are quality embroideried Nike shirts. 
                            <br />
                            <br />
                            Great for every day wear.
                            <br />
                            <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={shirtImage} disabledEffect sx={{ borderRadius: 1, ml: 4, width: 300 }} />
                    </Grid>
                </Grid>
            </Container>
        </RootStyle>
    );
}
