import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Backdrop, CircularProgress, Container, Typography, Grid } from '@mui/material';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { MotionContainer } from 'src/components/animate';

// components
import Page from 'src/components/Page';

import { PATH_PAGE } from 'src/routes/paths';

import { getProducts, sendEmail } from 'src/libs/api';

// sections
import { SponsorshipPackagesCard } from '.';

// ----------------------------------------------------------------------

// const RootStyle = styled('div')(({ theme }) => ({
//     minHeight: '100%',
//     paddingTop: theme.spacing(10),
//     paddingBottom: theme.spacing(10),
// }));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

// ----------------------------------------------------------------------

const SponsorshipPackagesPricing = ({ eventID }) => {
    const navigate = useNavigate();
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

    const handleSelected = (subscription, price, button) => {
        if (button.includes("Contact Us")) {
            navigate(PATH_PAGE.contact);
        } else {
            navigate(PATH_PAGE.golf.sponsorBuy(subscription, price, eventID));
        }
    };

    return (
        <Page title="Golf Pricing">
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <RootStyle>
            <Container component={MotionContainer}>
                <Typography variant="h3" align="center" paragraph>
                    2023 Sponsorship Packages 501(c)(3) Tax Deductible
                </Typography>

                <Typography align="center" sx={{ color: 'text.secondary', mb: 6 }}>
                    Your Generosity Does Make A Difference
                </Typography>
                <Accordion defaultExpanded>
                    <AccordionSummary>
                        <Typography variant="h6" color="primary.lighter">
                            Information
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Grid
                                container
                                spacing={{ xs: 5, md: 3 }}
                                justifyContent="space-between"
                                sx={{
                                    textAlign: { xs: 'center', md: 'left', mb: 10 },
                                }}
                            >
                                <Grid item xs={12} md={6} lg={5}>
                                    <Box
                                        sx={{
                                            // mb: 2,
                                            width: 24,
                                            height: 3,
                                            // borderRadius: 3,
                                            // bgcolor: 'primary.main',
                                            mx: { xs: 'auto', md: 0 },
                                        }}
                                    />
                                    <Typography variant="subtitle1">
                                    The Veterans Charity Golf Tournament is the club’s marquee fundraising event. Your generosity has enabled us to donate 
                                    over $330,000, improving the lives of Arizona veterans and their families.  The Veterans Club at Encanterra is a 
                                    501(c)(3) organization. 
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} lg={6}>
                                    <Typography variant="body2" sx={{ color: 'grey.800' }}>
                                    We currently support:
                                    <br/>
                                    •	HOHP (Honoring/Hiring/Helping Our Heroes of Pinal County)
                                    <br/>
                                    •	Veterans First LTD
                                    <br/>
                                    •	Honor Flight AZ
                                    <br/>
                                    •	Central Arizona College
                                    <br/>
                                    On Saturday, May 4, 2024, enjoy a day of golf and camaraderie while supporting our veterans at the beautiful Encanterra Country Club. 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Grid container spacing={6} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        {products.length > 0 && products.map((card) => (
                            <Grid item xs={12} md={4} key={card.id}>
                                <SponsorshipPackagesCard
                                    card={card}
                                    onSelected={handleSelected}
                                    buyButton={true}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </RootStyle>
        </Page>
    );
};

export default SponsorshipPackagesPricing;
