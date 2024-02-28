import { useState, useEffect } from 'react';
	
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Button, Stack, Card, Typography, Link } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import  useResponsive  from 'src/hooks/useResponsive';

// components
import Image from 'src/components/Image';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import TextMaxLine from 'src/components/TextMaxLine';

import { fDateTimeString } from 'src/utils/formatTime';

import { getEventAttendees } from 'src/libs/api';
// ----------------------------------------------------------------------

export default function EventItem({ event, vertical }) {
	const navigate = useNavigate();
	const upMd = useResponsive('up', 'md');
	const [attendees, setAttendees] = useState();

	const {
		id,
		title,
		description,
		start,
		end,
		extendedProps,
	} = event;

	const {
		cost,
		location,
		allowSponsor,
		allowVeteran,
		allowCommunity,
		comment,
		veteranFree,
		category,
		totalAttendees,
	} = extendedProps;

	const fetchAttendees = async () => {
		const response = await getEventAttendees(id);
		if (veteranFree) {
			setAttendees(response.totalWithGuests);
		} else {
			setAttendees(response.totalAttendees + response.totalGuests);
		}
	}

	useEffect(() => {
		fetchAttendees();
	}, []);


	const handleSponsor = () => {
		if (category == "Golf") {
			navigate(PATH_PAGE.golf.sponsorPackages(id));
		} else {
			navigate(PATH_PAGE.event.detail(id, "sponsor"));
		}
	}
	const handleVeteran = () => {
		if (category == "Golf") {
			navigate(PATH_PAGE.golf.veteranregistration(id));
		} else {
			navigate(PATH_PAGE.event.detail(id, "veteran"));
		}
	}
	const handleCommunity = () => {
		if (category == "Golf") {
			navigate(PATH_PAGE.golf.communityregistration(id));
		} else {
			navigate(PATH_PAGE.event.detail(id, "community"));
		}
	}

	return (
		<Card
			sx={{
				display: { sm: 'flex' },
				backgroundColor: 'grey.200',
				mb: 2,
				'&:hover': {
				boxShadow: (theme) => theme.customShadows.z24,
				},
				...(vertical && {
				flexDirection: 'column',
				}),
			}}
		>
			<Stack spacing={2} sx={{ p: 2 }}>
				<Stack
					spacing={{
						xs: 3,
						sm: vertical ? 3 : 1,
					}}
				>
					{comment && <Stack direction={upMd ? 'row' : 'column'}alignItems="center" justifyContent="flex-end" spacing={4}>
							<Label
									variant="filled" 
									startIcon={<Iconify icon="fe:info"/>}
									sx={{
										p: 2,
										color: "common.white",
										borderRadius: 4,
										backgroundColor: (theme) => attendees < totalAttendees ? theme.palette.primary.main : theme.palette.error.main
											// `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
									}}
								>
								{attendees < totalAttendees ? comment : 'Event sold out'}
							</Label>
						</Stack>
					}
					<Stack direction={upMd ? 'row' : 'column'} alignItems="center" justifyContent="space-between">
						<TextMaxLine variant="h6" line={1}>
							{title}
						</TextMaxLine>
						<Stack alignItems={upMd ? "flex-end" : "center"}>
							<Typography variant="subtitle2">
								{cost > 0 ? 
									fCurrency(cost) : 
									category === "Golf" ? "More details next page" : "FREE"}
							</Typography>
							{category === "Other" && veteranFree &&
								<Typography variant='caption' sx={{color: 'text.disabled', fontStyle: 'oblique' }}>
									Cost per guest. Veterans attend for free
								</Typography>
							}
							{category === "Other" && !veteranFree &&
								<Typography variant='caption' sx={{color: 'text.disabled', fontStyle: 'oblique' }}>
									Cost for each guest including veterans
								</Typography>
							}
						</Stack>
					</Stack>

					<Stack spacing={1}>
						<TextMaxLine
							variant="body1"
							color="primary.main"
							// sx={{
							// 	...(vertical && {
							// 	display: { sm: 'none' },
							// 	}),
							// }}
						>
							{description}
						</TextMaxLine>
					</Stack>
				</Stack>

				<Stack
					spacing={1.5}
					direction="row"
					alignItems="center"
					flexWrap="wrap"
					// divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
				>

				<Stack direction={upMd ? 'row' : 'column'}  alignItems="center" sx={{ typography: 'body2' }}>
						<Iconify icon='carbon:time' width={24} sx={{ color: 'primary.main', mr: 1.5 }}/>
						{fDateTimeString(start)} - {fDateTimeString(end)}
				</Stack>
				</Stack>
				<Stack spacing={0.5} direction={upMd ? 'row' : 'column'}  alignItems="center">
						<Iconify icon='carbon:location' width={24} sx={{ color: 'primary.main', mr: 1.5 }}/>
						<Typography variant="body2" sx={{color: 'primary.main'}}>{location}</Typography>
				</Stack>
				<Stack direction={upMd ? 'row' : 'column'}  alignItems="center" justifyContent="flex-start" spacing={4}>
						<Typography variant='overline' sx={{color: 'seconary.dark'}}>Register As</Typography>
						{allowSponsor && <AllowedButton allowedValue="Sponsor" color="success" onClick={handleSponsor}/>}
						{allowVeteran && <AllowedButton allowedValue="Veteran" color="error"  onClick={handleVeteran}/>}
						{allowCommunity && <AllowedButton allowedValue="Community" color="info"  onClick={handleCommunity}/>}
				</Stack>
			</Stack>
		</Card>
	);
}

const AllowedButton = ({allowedValue, color, onClick}) => {
	return <Button 
		variant="contained" 
		size="small"
		color={color} 
		sx={{ mb: 3 }}
		onClick={onClick}
	>
		{allowedValue}
	</Button>
}
