import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { MotionContainer } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';

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

export default function ShirtContent() {
    const upMd = useResponsive('up', 'md');

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
                                Thank you for purchasing a Veterans Club at Encanterra “RED” shirt.  RED stands for
                                <Typography variant="subtitle1" component="span" color="secondary.main" sx={{ml: 1, mr: 1}}>
                                Remember Everyone Deployed
                                </Typography>
                                and is a wonderful way to show support for deployed 
                                servicemembers, as well as our local veterans.  
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={2} sx={{textAlign: 'left'}}>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
										Shirts for Veterans will include the branch of service. 
									</Typography>

									<Typography variant="body2" sx={{ color: 'text.secondary' }}>
										If you are a Gold Star family (the immediate family of a fallen service member who died while serving in a time of conflict) your shirt is compliments of the Veterans Club.  Simply fill out the size and style (male/female) and your shirt will be processed for free.  
									</Typography>

									<Typography variant="body2" sx={{ color: 'text.secondary' }}>
										Please note that shirts tend to run small, so consider that when ordering.
									</Typography>

									<Typography variant="body2" sx={{ color: 'text.secondary' }}>
										You will be contacted by email when your shirt is ready to be picked up.  Please allow four to six weeks for delivery.
									</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </RootStyle>
    );
};