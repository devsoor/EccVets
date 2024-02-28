import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Iconify from 'src/components/Iconify';
import { PATH_PAGE } from 'src/routes/paths';

// components
import { MotionViewport } from 'src/components/animate';
import { fDateTimeString } from 'src/utils/formatTime';

import {
    startOfMonth,
    formatISO,
    addMonths,
  } from 'date-fns';
import { getEvents } from 'src/libs/api';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(6),
    },
}));

// ----------------------------------------------------------------------

export default function HomeEvents() {
    const navigate = useNavigate();
    const upMd = useResponsive('up', 'md');

    const [ events, setEvents] = useState(0);


    const fetchEvents = async () => {
        // setIsLoading(true);
        const startDate = formatISO(startOfMonth(new Date()));
        const endDate = formatISO(addMonths(startOfMonth(new Date()), 12));
        const params = {
          startDate,
          endDate,
          limit: 3
        }
        const response = await getEvents(params);
        setEvents(response);
        // setIsLoading(false);
    }

    useEffect(() => {
        fetchEvents();
  }, []);

    const handleLearnMore = () => {
        navigate(PATH_PAGE.event.list)
    }

    return (
        <RootStyle>
            <Container component={MotionViewport}>
                <Grid
                    container
                    // columnSpacing={{ xs: 0, md: 3 }}
                    // rowSpacing={{ xs: 5, md: 0 }}
                    justifyContent="space-between"
                >
                    <Grid item xs={12} md={6}
                        sx={{
                            textAlign: { xs: 'center', md: 'left', pr: 4 },
                        }}
                    >


                        <Typography variant="h2" sx={{mb: 4}}>
                            Our Mission
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'primary.main', textAlign: upMd ? 'justify' : 'center' }}>
                        Members of the Veterans Club join together in camaraderie and fellowship to honor local veterans 
                        and raise funds to assist the needs of U.S. and Allied veterans in Arizona.
                        </Typography>


                    </Grid>

                    <Grid item xs={12} md={5} sx={{p: upMd ? 4 : 6}}>
                        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                            Events
                        </Typography>
                        {events && <List sx={{ width: '100%', bgcolor: 'background.paper', color: 'grey.600', borderRadius: 1 }}>
                                {events.map(event => <Stack key={event.SK} spacing={1}>
                                        <ListItem  alignItems="flex-start">
                                            <ListItemText
                                                primaryTypographyProps={{ typography: 'subtitle1', color: 'grey:400' }}
                                                primary={event.title}
                                                secondary={
                                                    <Stack spacing={1}>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            variant="caption"
                                                            color="grey.800"
                                                        >
                                                            From: {fDateTimeString(event.start)}
                                                        </Typography>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            variant="caption"
                                                            color="grey.800"
                                                        >
                                                            To: {fDateTimeString(event.end)}
                                                        </Typography>
                                                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                                                            <Typography variant='caption'>Open to&nbsp;</Typography>
                                                            {event.extendedProps.allowSponsor && <Chip size="small" label="Sponsor" color="success" variant="contained" sx={{fontSize:'0.7em'}}/>}
                                                            {event.extendedProps.allowVeteran && <Chip size="small" label="Veteran" color="error" variant="contained"  sx={{fontSize:'0.7em'}}/>}
                                                            {event.extendedProps.allowCommunity && <Chip size="small" label="Public" color="info" variant="contained"  sx={{fontSize:'0.7em'}}/>}
                                                         </Stack>
                                                    </Stack>
                                                }
                                                />
                                        </ListItem>
                                    <Divider component="li" />
                                </Stack>)}
                            </List>
                            }
                            <Button
                                size="small"
                                endIcon={<Iconify icon="carbon:chevron-right" />}
                                onClick={handleLearnMore}
                                sx={{ color:"info.main" }}
                            >
                                See all events
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </RootStyle>
    );
}
