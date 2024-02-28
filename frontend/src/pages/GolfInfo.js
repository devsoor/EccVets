import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Container, Typography, Grid } from '@mui/material';

import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { getProducts } from 'src/libs/api';
import { SponsorshipPackagesCard } from 'src/sections/golf';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(10),
    },
}));

// ----------------------------------------------------------------------

export default function GolfInfo() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await getProducts('golfsponsorship');
        // console.log("fetchProducts: response = ", response);
        setProducts(response);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Page title="Golf Information">
            <RootStyle>
            <Container>
                    <Typography variant="h3" align="center" paragraph>
                        2023 Sponsorship Packages 501(c)(3) Tax Deductible
                    </Typography>

                    <Typography align="center" sx={{ color: 'text.secondary', mb: 6 }}>
                        Your Generosity Does Make A Difference
                    </Typography>
                    {/* <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                // lg: 'repeat(4, 1fr)',
                            },
                        }}
                    > */}
                    <Grid container spacing={3}>
                        {products.length > 0 && products.map((card) => (
                            <Grid item xs={12} md={4} key={card.id}>
                                <SponsorshipPackagesCard
                                    card={card}
                                    buyButton={false}
                                />
                            </Grid>
                        ))}

                    </Grid>
                    {/* </Box> */}
                </Container>
            </RootStyle>
        </Page>
    );
}
