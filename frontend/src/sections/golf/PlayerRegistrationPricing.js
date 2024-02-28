import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Card, Paper, Container, Typography, Stack, Backdrop, CircularProgress } from '@mui/material';
import { PATH_PAGE } from '../../routes/paths';

import { getProducts } from '../../libs/api';

// components
import Page from '../../components/Page';

// sections
import { PlayerRegistrationCard } from '.';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function PlayerRegistrationPricing({ type, eventID }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await getProducts('playersponsorship');
        // console.log("fetchProducts: response = ", response);
        setProducts(response);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSelected = (subscription, price) => {
        navigate(PATH_PAGE.golf.playerBuy(subscription, price, type, eventID));
    };

    return (
        <Page title="Player Pricing">
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <RootStyle>
                <Container>
                    <Typography variant="h3" align="center" paragraph>
                    Veterans Club Member Registration
                    </Typography>

                    <Typography align="center" sx={{ color: 'text.secondary', mb: 6 }}>
                        Come and have fun
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                        }}
                    >
                         {products.length > 0 && products.map((card) => (
                            <PlayerRegistrationCard
                                key={card.id}
                                card={card}
                                onSelected={handleSelected}
                            />
                        ))}
                    </Box>
                    <Typography variant="h4" sx={{ mb: 3, mt: 10 }}>
                        All packages include
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                        }}
                    >
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography component="ul" variant="subtitle1">
                                    Putting Contest (at the Turn)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Hole in One - 7 tickets plus $100 cash
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Within 3ft - 5 tickets
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Within 5ft Circle - 3 tickets
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Within 7ft Circle - 1 ticket
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography component="ul" variant="subtitle1">
                                    Ticket Drawing held at the Golf Banquet
                                </Typography>
                                <Typography component="li" variant="body2">
                                    3 Drawings at $100 each
                                </Typography>
                                <Typography component="li" variant="body2">
                                    2 Drawings at $200 each
                                </Typography>
                                <Typography component="li" variant="body2">
                                    1 Drawing at $500
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography component="ul" variant="subtitle1">
                                    Drone Drop (Hole 13)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    One Drop per Team
                                </Typography>
                                <Typography component="li" variant="body2">
                                    One Player selects ball drop from Screen. Team will play from there
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Normal penalty assessed if the ball lands in water
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography component="ul" variant="subtitle1">
                                    $20 credit each toward team cost
                                </Typography>
                                <Typography component="li" variant="body2">
                                    200 yards from the hole $20 per team (free if at least one ticket)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    150 yards from the hole $40 per team (free if at least two tickets)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    100 yards from the hole $60 per team (free if at least three tickets)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Around the Green - $100 per team (free if all hold tickets)
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography component="ul" variant="subtitle1">
                                    Pro Drive (Hole 18)
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Less than 300 yards - move ball to 300 yards
                                </Typography>
                                <Typography component="li" variant="body2">
                                    Greater than 300 yards - play ball where it lies
                                </Typography>
                            </Stack>
                        </Paper>
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    );
}
