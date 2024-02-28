import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    // maxWidth: '100%',
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    variant: 'outlined',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
        padding: theme.spacing(5),
    },
}));

// ----------------------------------------------------------------------

PlayerRegistrationCard.propTypes = {
    index: PropTypes.number,
    card: PropTypes.object,
};

export default function PlayerRegistrationCard({ card, onSelected }) {
    const { id, image, price, features } = card;

    const handleOnClick = () => {
        onSelected(id, price);
    };

    return (
        <Card
            sx={{
                p: 5,
                boxShadow: (theme) => ({
                        xs: theme.customShadows.card,
                        md: `-40px 40px 80px 0px ${alpha(
                        theme.palette.common.black,
                        0.30
                    )}`,
                }), 
                margin: 'auto',
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                flexDirection: 'column',
                variant: 'outlined',
                                
            }}
        >             
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {id}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    $
                </Typography>
                <Typography variant="h2" sx={{ mx: 1 }}>
                    {price.toLocaleString('en-US')}
                </Typography>
            </Box>

            <Box sx={{ width: 60, height: 60, mt: 3 }}>
                    <Image src={image} />
                </Box>


            <Stack component="ul" spacing={2} sx={{ my: 2, width: 1 }}>
                {features.map(item => (
                        <Stack
                            key={item.name}
                            component="li"
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                            sx={{ typography: 'body2', color: 'text.primary' }}
                        >
                            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
                            <Typography variant="body2">{item.name}</Typography>
                        </Stack>
                    ))}
            </Stack>

            <Button
                fullWidth 
                size="large" 
                variant="contained" 
                onClick={handleOnClick} 
                sx={{color:"common.white", backgroundColor: 'primary.darker'}}>
                Register
            </Button>
        </Card>
    );
}
