import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

SponsorshipPackagesCard.propTypes = {
    index: PropTypes.number,
    card: PropTypes.object,
};

export default function SponsorshipPackagesCard({ card, onSelected, buyButton }) {
    const { id, image, price, features, button } = card;

    const handleOnClick = () => {
        onSelected(id, price, button);
    };

    return (
        <Card
            sx={{
                p: 3,
                boxShadow: (theme) => ({
                        // xs: theme.customShadows.card,
                        xs: `-40px 40px 80px 0px ${alpha(
                            theme.palette.common.black,
                            0.30
                        )}`,
                }), 
                maxWidth: 420,
                height: 500,                                  
            }}
        >    
            <Stack sx={{height: '90%', direction: 'column', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Typography variant="overline" sx={{ color: 'secondary.main' }}>
                    {id}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                        $
                    </Typography>
                    <Typography variant="h3" sx={{ mx: 1, color: 'primary.main' }}>
                        {price.toLocaleString('en-US')}
                    </Typography>
                </Box>


                <Box sx={{ width: 30, height: 30 }}>
                    <Image src={image} />
                </Box>

                <Stack component="ul" spacing={2} sx={{ my: 2, width: 1 }}>
                    {features.map(item => (
                        <Stack
                            key={item.name}
                            component="li"
                            direction="row"
                            alignItems="flex-start"
                            // spacing={1.5}
                            sx={{ typography: 'body2', color: 'text.primary', display: 'flex', alignItems:'flex-start' }}
                        >
                            <Iconify icon={'mdi:dot'} sx={{ width: 20, height: 20 }} />
                            <Typography variant="body2">{item.name}</Typography>
                        </Stack>
                    ))}
                </Stack>

            </Stack>
            {buyButton && <Button
                fullWidth 
                size="large" 
                variant="contained" 
                onClick={handleOnClick} 
                sx={{color:"common.white", backgroundColor: 'primary.darker'}}>
                    {button}
            </Button>}
        </Card>
    );
}
