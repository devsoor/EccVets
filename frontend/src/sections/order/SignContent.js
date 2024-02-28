// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { MotionContainer } from 'src/components/animate';
import Image from 'src/components/Image';

import signImage from '../../assets/images/veteranSign.jpg';
// ----------------------------------------------------------------------
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
    // paddingBottom: theme.spacing(4),
    // margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

// ----------------------------------------------------------------------
export default function SignContent() {
    return (
        <RootStyle>
            <Container component={MotionContainer}>
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
                                textAlign: { xs: 'center', md: 'left' },
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
                                Thank you for your donation for a Veterans Community Support Sign.
                                <br/>
                                <br/>
                                Signs are displayed four times per year on Memorial Day, Independence Day, Veterans Day, and 
                                during the annual Charity Golf Event.
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Typography variant="body2" sx={{ color: 'grey.800' }}>
                                These signs are a great way to honor family or friends for their military service or to show your support for our veterans. 
                                Please note that text works best with 30 characters but may be up to 80 characters if you accept smaller type font.
                                    <br />
                                    <br />
                                    Annual renewal is $100.  You will be notified when it is time to renew your sign.
                                    <br />
                                    <br />
                                    Your donation is tax deductible.  You will receive a sales receipt by email with tax information within 1 to 2 days.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mb: 4 }}>
                            <Grid item xs={12} sx={{mt: 4}}>
                                <Typography variant="h4" align="center" paragraph sx={{ mb: 6 }}>
                                    Community Supporting Veterans Sign
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="body2" sx={{ color: 'grey.800', mb: 3 }}>
                                    Preventing homelessness and stabilizing the lives of our Women Veterans while providing
                                    referrals, resources and information to all Veterans, their families and caregivers.
                                    <br />
                                    <br />
                                    The Community Supporting Veterans Sign is 18"x 24" and includes stand and placement. It is
                                    available to Residents and Non-Residents of Encanterra.
                                    <br />
                                    <br />
                                    Please complete the form below to order now. Include the Name(s) as they should appear on
                                    the Sign.
                                    <br />
                                    <br />
                                </Typography>
                                <Typography sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                                    * No Company name or advertising can be placed in the sign.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src={signImage} disabledEffect sx={{ borderRadius: 1, ml: 4, width: 300 }} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </RootStyle>
    );
};