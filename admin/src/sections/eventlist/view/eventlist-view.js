import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from 'src/hooks/use-responsive';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { alpha, styled } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';

import { 
	DataGrid, 
	GridToolbarContainer, 
	GridToolbarExport, 
	GridCellEditStopReasons,
	gridClasses,
} from '@mui/x-data-grid';

import {
    startOfMonth,
    formatISO,
    addMonths,
  } from 'date-fns';
  // utils
import { fDateTimeString } from 'src/utils/format-time';

import { getProduct, getEvents, getEventAttendees, getEventTeamPlayers, updateEventPrice } from 'src/libs/api';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------


const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
	fontSize: '0.7rem',
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: theme.palette.grey[200],
		'&:hover, &.Mui-hovered': {
		backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
		'@media (hover: none)': {
			backgroundColor: 'transparent',
		},
		},
		'&.Mui-selected': {
		backgroundColor: alpha(
			theme.palette.primary.main,
			ODD_OPACITY + theme.palette.action.selectedOpacity,
		),
		'&:hover, &.Mui-hovered': {
			backgroundColor: alpha(
			theme.palette.primary.main,
			ODD_OPACITY +
				theme.palette.action.selectedOpacity +
				theme.palette.action.hoverOpacity,
			),
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				ODD_OPACITY + theme.palette.action.selectedOpacity,
			),
			},
		},
		},
	},
}));

const Mailto = ({ email, subject, body, ...props }) => {
	return (
		<a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`} style={{ textDecoration: 'underline' }}>
			{props.children}
		</a>
	);
};

// ----------------------------------------------------------------------

export default function EventListView () {
	const navigate = useNavigate();
	const upMd = useResponsive('up', 'md');

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ events, setEvents] = useState();
    const [ selected, setSelected] = useState();
	const [ teamOpen, setTeamOpen ] = useState(false);
	const [ selectedTeam, setSelectedTeam ] = useState();
	const [ totalAttendees, setTotalAttendees ] = useState();
	const [paymentLinkReceived, setPaymentLinkReceived] = useState(false);

    const fetchEvents= async () => {
        setIsLoading(true);
        const startDate = formatISO(startOfMonth(new Date()));
        const endDate = formatISO(addMonths(startOfMonth(new Date()), 12));
        const response = await getEvents({startDate, endDate});
		// console.log("response = ", response)
        setEvents(response);
        setIsLoading(false);
    }

    useEffect(() => {
		  fetchEvents();
	}, []);

    function CustomToolbar() {
      return (
        <GridToolbarContainer sx={{justifyContent: 'space-between', background: 'transparent'}}>
			<Typography variant="subtitle1" sx={{color: 'info.dark'}}>{selected.title} event</Typography>
			<Typography variant="subtitle2" sx={{color: 'info.dark'}}>Total attendees/sponsors: {totalAttendees}</Typography>

			<GridToolbarExport
			csvOptions={{
				fileName: rows && rows.title,
				delimiter: ';',
				utf8WithBom: true,
			}}
			/>
        </GridToolbarContainer>
      );
	}

	const handlePaymentLink = async (e, row) => {
		const product = await getProduct(row.package, {category: 'golfsponsorship'});
		navigator.clipboard.writeText(product.paymentLink);
		enqueueSnackbar(`Copied payment link ${product.paymentLink}. You may paste it in your email`, {persist: true})
	}


	const handlePeopleView = (e, row) => {
		e.preventDefault();
		const role = row.SK.split("#")[0];
		const id = row.SK.split("#")[1];
		navigate(paths.dashboard.people.view(role, id, role));
	}

	const handleTeamView = async ( e, team, teamName ) => {
		e.preventDefault();
		setIsLoading(true);
		const teamID = team.split("#")[1];
		const teamPlayers = await getEventTeamPlayers(teamID);
		setSelectedTeam({teamName, teamPlayers})
		setTeamOpen(true);
		setIsLoading(false);
	}

	const updatePrice = async(row, value) => {
		const params = {
			role: row.SK.split("#")[0],
			roleID: row.SK.split("#")[1],
			price: value
		}
		const response = await updateEventPrice(row.PK.split("#")[1], params)
	}

	const getColumnsOther = (selected) => {
		const columns = [
			{
				field: 'fullName', 
				headerName: 'Name', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Tooltip title="Go to user">
						<Button sx={{textDecoration: 'underline', display: 'flex', justifyContent: 'flex-start'}} onClick={e=>handlePeopleView(e, params.row)}>
							<Typography variant='caption' >
								{params.row.fullName}
							</Typography>
						</Button>            
					</Tooltip>
				)
			},
			{ 
				field: 'role', 
				headerName: 'Role', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
						<Typography variant='caption'>
							{params.row.SK.split("#")[0]}
						</Typography>
				)
			},
			{ 
				field: 'emailAddress', 
				headerName: 'Email', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Mailto email={params.value}>
						<Typography variant="caption" >
							{params.value}
						</Typography>
					</Mailto>
				)
			},
			{ 
				field: 'phoneNumber', 
				headerName: 'Phone', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => 
					(
						<Typography variant='caption' sx={{width: 150, display: 'flex', alignItems: 'center'}}>
						{params.value}
						</Typography>
						
					)
	
			},
			{
				field: 'veteranFree', 
				headerName: 'Veteran Free', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => <>
						<Label color={selected.extendedProps.veteranFree === true ? "success" : "error"} >
								{selected.extendedProps.veteranFree === true ? "Yes" : "No"}
						</Label>
				</>
			
				
			},
			{ field: 'numberOfGuests', headerName: 'Guests', editable: false, flex: 0.5, headerClassName: 'super-app-theme--header' },
			{
				field: 'totalCost', 
				headerName: 'Paid', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				valueFormatter: (params) => fCurrency(params.value)
			},			
		  ];
		  return columns;
	}

	const getColumnsGolf = (selected) => {
		const columns = [
			{
				field: 'fullName', 
				headerName: 'Name', 
				editable: true, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Tooltip title="Go to user">
						<Button sx={{textDecoration: 'underline', display: 'flex', justifyContent: 'flex-start'}} onClick={e=>handlePeopleView(e, params.row)}>
							<Typography variant='caption'>
								{params.row.fullName}
							</Typography>
						</Button>            
					</Tooltip>
				)
			},
			{ 
				field: 'role', 
				headerName: 'Role', 
				// editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
						<Typography variant="caption" >
							{params.row.SK.split("#")[0]}
						</Typography>
				)
			},
			{ 
				field: 'emailAddress', 
				headerName: 'Email', 
				editable: true, 
				// flex: 1,
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Mailto email={params.value}>
						<Typography variant="caption"  sx={{color: "primary.main"}}>
							{params.value}
						</Typography>
					</Mailto>
				)
			},
			{ 
				field: 'phoneNumber', 
				headerName: 'Phone', 
				editable: true, 
				flex: 0.6,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => 
					(
						<Typography variant='caption' sx={{width: 150, display: 'flex', alignItems: 'center'}}>
							{params.value}
						</Typography>
						
					)
			},
			{
				field: 'companyName', 
				headerName: 'Company', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Typography variant="body2">
						{params.row.type === "sponsor" ? params.value : "N/A" }
					</Typography>            
				)
			},
			{
				field: 'teamName', 
				headerName: 'Team', 
				editable: false, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Tooltip title="Go to user">
						<Button
							sx={{textDecoration: 'underline', display: 'flex', justifyContent: 'flex-start'}} 
							onClick={e=>handleTeamView(e, params.row.team, params.row.teamName)}
						>
							<Typography variant='caption'>
								{params.row.teamName}
							</Typography>
						</Button>            
					</Tooltip>
				)
			},
			{ field: 'package', headerName: 'Package', editable: false, flex: 1, headerClassName: 'super-app-theme--header' },
			{
				field: 'price', 
				headerName: 'Paid', 
				editable: true, 
				flex: 1,
				headerClassName: 'super-app-theme--header',
				valueFormatter: (params) => fCurrency(params.value),
				renderCell: (params) => (
					<div>
						{params.value === 0 ? 
							<Button
								variant="contained"
								size="small"
								onClick={e=>handlePaymentLink(e, params.row)}
							>
								<Typography variant='caption'>
									Copy payment link
								</Typography>
							</Button>
						: fCurrency(params.value)}
					</div>
				)

			},			
			{ field: 'golfCart', headerName: 'Golf carts', editable: false, flex: 0.5, headerClassName: 'super-app-theme--header' },
			// {
			// 	field: 'additionalMeals', 
			// 	headerName: 'Meals', 
			// 	editable: false, 
			// 	// width: 100,
			// 	flex: 0.5,
			// 	headerClassName: 'super-app-theme--header',
			// 	renderCell: (params) => <>
			// 		{params.row.type === "sponsor" ? 
			// 			<Label color={params.value === true ? "success" : "error"}>
			// 					{params.value === true ? "Yes" : "No"}
			// 			</Label>
			// 			: "N/A"        
			// 		}  
			// 	</>
			// },
		];
		return columns;
	}

	const handleEventClick  = async (e, selected) => {
		let columns = [];
		if (selected.extendedProps.category === "Golf") {
			columns = getColumnsGolf(selected);
		} else {
			columns = getColumnsOther(selected);
		}
		setColumns(columns);
		setIsLoading(true);
		setSelected(selected);
		const response = await getEventAttendees(selected.SK);
		// console.log("handleEventClick: response.attendees = ", response.attendees)
		setRows(response.attendees);
		let totalAttendees;
		if (selected.extendedProps.category !== "Golf") {
			totalAttendees = response.attendees.reduce((accumulator, item) => accumulator + item.numberOfGuests, 0);
			// console.log("totalAttendees = ", totalAttendees)
			setTotalAttendees(totalAttendees + response.attendees.length);
		} else {
			setTotalAttendees(response.attendees.length)
		}
		setIsLoading(false);
	}

	const handleClose = () => {
		setTeamOpen(false);
	};

    return (
        <Grid container>
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
              	<CircularProgress color="primary" />
            </Backdrop>
            <Grid item xs={12} md={3}>
				<Typography variant="body2" sx={{color: 'info.main'}}>Click on event to view attendees</Typography>
				{events && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
					{events.map(event => <Stack key={event.SK} spacing={1}>
						<Button variant="outlined" onClick={e => handleEventClick(e, event)} >
							<ListItem  alignItems="flex-start">
								<ListItemText
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
												{event.extendedProps.allowSponsor && <Chip sx={{fontSize: '0.6rem'}} label="Sponsor" color="success" variant="contained"/>}
												{event.extendedProps.allowVeteran && <Chip sx={{fontSize: '0.6rem'}} label={event.extendedProps.veteranFree ? 'Veteran (FREE)' : 'Veteran'} color="error" variant="contained"/>}
												{event.extendedProps.allowCommunity && <Chip  sx={{fontSize: '0.6rem'}} label="Community" color="info" variant="contained"/>}
											</Stack>

										</Stack>
									}
									/>
							</ListItem>
							</Button>
						<Divider component="li" />
					</Stack>)}
				</List>
				}
			</Grid>
			<Grid item xs={12} md={9}>

				{selected && rows && columns &&
					<Box 
						sx={{ height: 800, width: '100%', ml: 2,
						'& .super-app-theme--header': {
							backgroundColor: 'info.dark',
							color: 'common.white'
						}, 
						}}
					>
						<StripedDataGrid
							rows={rows}
							columns={columns}
							getRowId={row => row.SK}
							getRowClassName={(params) =>
								params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
							}
							slots={{ toolbar: CustomToolbar }}
							onCellEditStop={(params, event) => {
								if (params.reason === 'enterKeyDown') {
									updatePrice(params.row, event.target.value);
								}
							  }}
					  
						/>
					</Box>
				}
			</Grid>
			
			{selectedTeam && 
				<Dialog fullWidth maxWidth="xs" open={teamOpen}>
					<DialogTitle sx={{p: 1, display: 'flex', justifyContent: 'center'}}> {selectedTeam.teamName} </DialogTitle>
					<DialogContent>
						{selectedTeam.teamPlayers.map(player => (
							<Stack direction="row" key={player.SK} sx={{backgroundColor: "grey.300", m: 2, p: 2, borderRadius: 1}}>
									{player.fullName}&nbsp;&nbsp;
									<Mailto email={player.emailAddress}>
										<Typography variant="subtitle2">
											{player.emailAddress}
										</Typography>
									</Mailto>
							</Stack>

						))}
					</DialogContent>
					<DialogActions>
							<Button variant="contained" onClick={handleClose} autoFocus>OK</Button>
						</DialogActions>
				</Dialog>
			}
		</Grid>
    )
}