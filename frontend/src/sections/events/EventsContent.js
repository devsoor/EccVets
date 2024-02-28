import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { 
	Pagination,
	Container,
	Stack,
	Button,
	Box,
	Backdrop,
	CircularProgress
} from '@mui/material';
import {
    startOfMonth,
    endOfMonth,
    formatISO,
    addMonths,
  } from 'date-fns';
import { getEvents, getEventsFilter } from 'src/libs/api';
import Iconify from 'src/components/Iconify';
import { NAV } from 'src/config';

import { EventItem, EventFilters } from '.';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(4),
    margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));
// ----------------------------------------------------------------------

export default function EventsContent () {
	const [ events, setEvents] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	const fetchEvents= async () => {
		setIsLoading(true);
		const startDate = formatISO(startOfMonth(new Date()));
		const endDate = formatISO(addMonths(startOfMonth(new Date()), 12));
		const response = await getEvents({startDate, endDate});
		setEvents(response);
		setIsLoading(false);
	}

	const fetchEventsFiltered = async (type, value) => {
		setIsLoading(true);
		if (value) {
			const response = await getEventsFilter({type, value});
			// console.log("fetchEventsFiltered response: ", response)
			setEvents(response);
		} else {
			fetchEvents();
		}
		setIsLoading(false);
	}

	useEffect(() => {
		fetchEvents();
	}, []);

	const handleMobileOpen = () => {
		setMobileOpen(true);
	};
	
	const handleMobileClose = () => {
		setMobileOpen(false);
	};

	const handleFilterChange = (type, value) => {
		if (type && value) {
			fetchEventsFiltered(type, value)
		} else {
			fetchEvents();
		}
	}
	
    return (
      	<RootStyle>
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{
						py: 5,
					}}
				>
						<Button
							color="inherit"
							variant="contained"
							startIcon={<Iconify icon="carbon:filter" width={18} />}
							onClick={handleMobileOpen}
							sx={{
								display: { md: 'none' },
							}}
						>
							Filters
						</Button>

				</Stack>
					<Stack direction={{ xs: 'column', md: 'row' }}>
						<EventFilters
							mobileOpen={mobileOpen} 
							onMobileClose={handleMobileClose}
							onFilterChange={handleFilterChange}
						/>
						<Box
							sx={{
								flexGrow: 1,
								pl: { md: 8 },
								width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
							}}
						>
							{events && events.map((event) => (
								<div key={event.id} >
									{event.extendedProps.active && <EventItem event={event} vertical/>}
								</div>
							))}
					</Box>
				</Stack>
				{events && events.length > 10 && 
					<Pagination
						count={10}
						color="primary"
						size="large"
						sx={{
						my: 10,
						'& .MuiPagination-ul': {
							justifyContent: 'center',
						},
						}}
					/>
				}
			</Container>
      </RootStyle>
    )
}