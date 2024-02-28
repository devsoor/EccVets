import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
	Stack,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
	DialogContent,
	Typography,
	Backdrop,
	TextField,
    CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { fDateTimeCustom } from 'src/utils/format-time';
import { paths } from 'src/routes/paths';

import { 
	DataGrid, 
	GridToolbarContainer, 
	GridToolbar,
	GridToolbarExport, 
	GridRowModes, 
	GridActionsCellItem ,
	gridClasses,
	GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { getTeams, updateTeam, deleteTeam, createPlayer, deletePlayer } from 'src/libs/api'
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



// ----------------------------------------------------------------------

// function EditToolbar(props) {
// 	const { setRows, setRowModesModel } = props;
  
// 	const handleClick = () => {
// 	  const id = uuidv4();
// 	  setRows((oldRows) => [...oldRows, {
// 		 id, 
// 		 teamName: '', 
// 		 type: '', 
// 		 isNew: true 
// 	}]);
// 	  setRowModesModel((oldModel) => ({
// 		...oldModel,
// 		[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
// 	  }));
// 	};
  
// 	return (
// 	  <GridToolbarContainer sx={{justifyContent: 'space-between', p: 0}}>
// 		<GridToolbar />
// 		<Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
// 		  Add New Team
// 		</Button>
// 	  </GridToolbarContainer>
// 	);
// }

const Mailto = ({ email, subject, body, ...props }) => {
	return (
		<a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`} style={{ textDecoration: 'underline' }}>
			{props.children}
		</a>
	);
};

export default function GolfListView({ id }) {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
	const [teamToDelete, setTeamToDelete] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [openPlayer, setOpenPlayer] = useState(false);
	const [newPlayerFullName, setNewPlayerFullName] = useState('');
	const [newPlayerEmailAddress, setNewPlayerEmailAddress] = useState('');
	const [newPlayerPhoneNumber, setNewPlayerPhoneNumber] = useState('');
	const [newPlayerRow, setNewPlayerRow] = useState();
	const [playerToDelete, setPlayerToDelete] = useState();
	const [openDeletePlayer, setOpenDeletePlayer] = useState(false);
	// const [ golfProducts, setGolfProducts ] = useState();
	// const [ playerProducts, setPlayerProducts ] = useState();

    const fetchGolf = async () => {
		setIsLoading(true);
        const teams = await getTeams();
		// console.log("fetchGolf: teams = ", teams)
        if (teams) {
            setRows(teams);
        }
		setIsLoading(false);
    }

	// const fetchProducts = async () => {
	// 	let response;
    //     setIsLoading(true);
    //     response = await getProductsByType('golfsponsorship');
    //     console.log("fetchProducts: gofl response = ", response);
	// 	const golfProducts = response.map(item => item.id);
    //     console.log("fetchProducts: golfProducts  = ", golfProducts);
    //     setGolfProducts(golfProducts);
    //     response = await getProductsByType('playersponsorship');
    //     console.log("fetchProducts: player response = ", response);
	// 	const playerProducts = response.map(item => item.id);
	// 	console.log("fetchProducts: playerProducts  = ", playerProducts);
    //     setPlayerProducts(playerProducts);
    //     setIsLoading(false);
    // }

    useEffect(() => {
        fetchGolf();
		// fetchProducts();
    }, []);

	
    function CustomToolbar() {
		const handleClick = () => {
			navigate(paths.dashboard.golfteam.newTeam)
		};
		return (
			<GridToolbarContainer sx={{justifyContent: 'space-between'}}>
				<GridToolbar />
				<Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
					Add Team
				</Button>			
			</GridToolbarContainer>
		);
	  }

	const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
		  event.defaultMuiPrevented = true;
		}
	};
	
	const handleEditClick = (id) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};
	
	const handleSaveClick = (id) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteTeam = async () => {
		const row = rows.filter((row) => row.id === teamToDelete)[0];
		const params = {
			row
		}
		const response = await deleteTeam(teamToDelete, params);
		if (response.statusCode === 200) {
			enqueueSnackbar("Deleted team successfully!");
			setRows(rows.filter((row) => row.id !== teamToDelete));
			setOpenDelete(false);
		} else {
			enqueueSnackbar("Error deleting team", {variant: "error"});
		}

	}

	const handleDeleteNo = () => {
        setOpenDelete(false);
    };
	const handlePlayerNewNo = () => {
        setOpenPlayer(false);
    };
	
	const handleDeleteClick = (id) => () => {
		setTeamToDelete(id);
		setOpenDelete(true);
	};

	const handleCancelClick = (id) => () => {
		setRowModesModel({
		  ...rowModesModel,
		  [id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
	
		const editedRow = rows.find((row) => row.id === id);
		if (editedRow.isNew) {
		  setRows(rows.filter((row) => row.id !== id));
		}
	};
	
	const processRowUpdate = async (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		const params = {
			updatedRow
		}
		const response = await updateTeam(updatedRow.id, params);
		if (response.statusCode === 200) {
			enqueueSnackbar("Updated team successfully!");
			setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		} else {
			enqueueSnackbar("Error updating team", {variant: "error"});
		}
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handlePlayerNewYes = async () => {
		const playerID = newPlayerRow.row[`playerID${newPlayerRow.playerNum}`];
		const playerIDNum = `${newPlayerRow.playerNum}`;
		if (!playerID) {
			newPlayerRow.row[`playerName${playerIDNum}`] = newPlayerFullName;
			newPlayerRow.row[`playerEmail${playerIDNum}`] = newPlayerEmailAddress;
			const params = {
				fullName: newPlayerFullName,
				emailAddress: newPlayerEmailAddress,
				phoneNumber: newPlayerPhoneNumber,
				teamID: newPlayerRow.row.id
			}
			const response = await createPlayer(params);
			if (response.statusCode === 200) {
				enqueueSnackbar("Created player successfully!");
				setRows(rows.map((row) => (row.id === newPlayerRow.id ? newPlayerRow : row)));
			} else {
				enqueueSnackbar("Error updating team", {variant: "error"});
			}
		}
		setOpenPlayer(false);
	}

	const handleAddPlayer = (event, row, playerNum) => {
		setNewPlayerRow({row, playerNum});
		setNewPlayerFullName('');
		setNewPlayerEmailAddress('');
		setOpenPlayer(true);
	}

	const handleDeletePlayer = (event, row, playerNum) => {
		const teamID = row.id;
		const playerID = row[`playerID${playerNum}`];
		const playerName = row[`playerName${playerNum}`];
		const playerEmail = row[`playerEmail${playerNum}`];
		setPlayerToDelete({row, teamID, playerName, playerEmail, playerID});
		setOpenDeletePlayer(true);
	}

	const handleDeletePlayerYes = async () => {
		const response = await deletePlayer(playerToDelete.playerID, { teamID: playerToDelete.teamID })
		if (response.statusCode === 200) {
			enqueueSnackbar("Deleted player successfully!");
			fetchGolf();
		} else {
			enqueueSnackbar("Error deleting player", {variant: "error"});
		}
		setOpenDeletePlayer(false);
	}

	
	const handleDeletePlayerNo = () => {
        setOpenDeletePlayer(false);
    };

	const columns = [
		{
			field: 'sponsorName', 
			headerName: 'Sponsor Name', 
			editable: true, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
		},
		{
			field: 'sponsorEmail', 
			headerName: 'Sponsor Email', 
			editable: false, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
		},
		{
			field: 'sponsorPhone', 
			headerName: 'Sponsor Phone', 
			editable: true, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
		},
		{
			field: 'sponsorCompany', 
			headerName: 'Sponsor Company', 
			editable: true, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
		},
		{
			field: 'teamName', 
			headerName: 'Team', 
			editable: true, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
		},
		{
			field: 'type', 
			headerName: 'Type', 
			editable: false, 
			flex: 0.6,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => (
				<Typography variant='caption'>
					{params.value.toUpperCase()}
				</Typography>
			)
		},
		{ 
			field: 'package', 
			headerName: 'Package', 
			editable: false, 
			flex: 1, 
			headerClassName: 'super-app-theme--header',
		},
		{ field: 'golfCart', headerName: 'Golf cart(s)', editable: true, flex: 0.4, headerClassName: 'super-app-theme--header' },
		// {
		// 	field: 'additionalMeals', 
		// 	headerName: 'Meals', 
		// 	editable: true, 
		// 	flex: 0.5,
		// 	headerClassName: 'super-app-theme--header',
		// 	renderCell: (params) => <>
		// 		{params.row.type.toUpperCase() === "SPONSOR" ? 
		// 			<Label color={params.value === true ? "success" : "error"}>
		// 					{params.value === true ? "Yes" : "No"}
		// 			</Label>
		// 			: "N/A"        
		// 		}  
		// 	</>
		// },
		{
			field: 'createdAt', 
			headerName: 'Created', 
			editable: false, 
			// width: 200,
			flex: 0.8,
			headerClassName: 'super-app-theme--header',
			valueFormatter: (params) => fDateTimeCustom(params.value)
		},
		{
			field: 'playerName1', 
			headerName: 'Player 1', 
			editable: false, 
			disableExport: true,
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => <>

				{!params.row.teamName ?"N/A" :
					!params.value ?
						<Button variant="contained" size="small" onClick={e => handleAddPlayer(e, params.row, "1")} sx={{m:2}}>
							New
						</Button>
					:
					<Stack sx={{pt: 2, pb: 2}}>
						<Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-between'}}>
							<Typography variant='caption'>
								{params.value} 
							</Typography>
							{params.row.playerName1 && <Button color="error" size="large" startIcon={<DeleteIcon />} onClick={e=>handleDeletePlayer(e, params.row, "1")}/>}
						</Stack>
							<Mailto email={params.row.playerEmail1}>
								<Typography variant="caption">
									{params.row.playerEmail1}
								</Typography>
							</Mailto>
					</Stack>
				}
			</>
		},
		{
			field: 'playerName2', 
			headerName: 'Player 2', 
			editable: false, 
			disableExport: true,
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => <>
				{!params.row.teamName ? "N/A" :
				!params.value && (params.row.type.toUpperCase() === "SPONSOR" ||
					(params.row.type.toUpperCase() !== "SPONSOR" && params.row.package === "Twosome" )) ? 
						<Button variant="contained" size="small" onClick={e => handleAddPlayer(e, params.row, "2")} sx={{m:2}}>
						New
						</Button>
				:
					<Stack sx={{pt: 2, pb: 2}}>
						<Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-between'}}>
							<Typography variant='caption'>
								{params.value} 
							</Typography>
							{params.row.playerName2 && <Button color="error" size="large" startIcon={<DeleteIcon />} onClick={e=>handleDeletePlayer(e, params.row, "2")}/>}
						</Stack>
							<Mailto email={params.row.playerEmail2}>
								<Typography variant="caption">
									{params.row.playerEmail2}
								</Typography>
							</Mailto>
					</Stack>
				}
			</>
		},
		{
			field: 'playerName3', 
			headerName: 'Player 3', 
			editable: false, 
			disableExport: true,
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => <>
				{!params.row.teamName ? "N/A" :
				!params.value && (params.row.type.toUpperCase() === "SPONSOR" ||
					(params.row.type.toUpperCase() !== "SPONSOR" && params.row.package === "Threesome" || params.row.package === "Foursome" )) ? 
					<Button variant="contained" size="small"  onClick={e => handleAddPlayer(e, params.row, "3")} sx={{m:2}}>
					New
					</Button>
				:
					<Stack sx={{pt: 2, pb: 2}}>
						<Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-between'}}>
							<Typography variant='caption'>
								{params.value} 
							</Typography>
							{params.row.playerName3 && <Button color="error" size="large" startIcon={<DeleteIcon />} onClick={e=>handleDeletePlayer(e, params.row, "3")}/>}
						</Stack>
							<Mailto email={params.row.playerEmail3}>
								<Typography variant="caption">
									{params.row.playerEmail3}
								</Typography>
							</Mailto>
					</Stack>
				}
			</>
		},
		{
			field: 'playerName4', 
			headerName: 'Player 4', 
			editable: false, 
			disableExport: true,
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => <>
				{!params.row.teamName ? "N/A" :
				!params.value && (params.row.type.toUpperCase() === "SPONSOR" ||
					(params.row.type.toUpperCase() !== "SPONSOR" && params.row.package === "Foursome" )) ? 
					<Button variant="contained" size="small" onClick={e => handleAddPlayer(e, params.row, "4")} sx={{m:2}}>
					New
					</Button>
				:
					<Stack sx={{pt: 2, pb: 2}}>
						<Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-between'}}>
							<Typography variant='caption'>
								{params.value} 
							</Typography>
							{params.row.playerName4 && <Button color="error" size="large" startIcon={<DeleteIcon />} onClick={e=>handleDeletePlayer(e, params.row, "4")}/>}
						</Stack>
							<Mailto email={params.row.playerEmail4}>
								<Typography variant="caption">
									{params.row.playerEmail4}
								</Typography>
							</Mailto>
					</Stack>
				}
			</>
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			flex: 0.6,
			cellClassName: 'actions',
			headerClassName: 'super-app-theme--header',
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
	
				if (isInEditMode) {
				return [
					<GridActionsCellItem
						icon={<SaveIcon />}
						label="Save"
						sx={{
							color: 'primary.main',
						}}
						onClick={handleSaveClick(id)}
					/>,
					<GridActionsCellItem
						icon={<CancelIcon />}
						label="Cancel"
						className="textPrimary"
						onClick={handleCancelClick(id)}
						color="inherit"
					/>,
				];
				}
		
				return [
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					className="textPrimary"
					onClick={handleEditClick(id)}
					color="inherit"
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={handleDeleteClick(id)}
					color="inherit"
				/>,
				];
			},
		},
	];

	return <>
	 		<Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
				<CircularProgress color="primary" />
			</Backdrop>
			<Box 
				sx={{ height: 1000, width: '100%', 
				'& .super-app-theme--header': {
					backgroundColor: 'info.dark',
					color: 'common.white'
				}, 
				}}
			>
				<StripedDataGrid
					rows={rows}
					columns={columns}
					// getRowId={row => row.team.SK}
					getRowClassName={(params) =>
						params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
					}
					getRowHeight={() => 'auto'}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					// onRowEditStart={handleRowEditStart}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					// isCellEditable={(params) => params.row.additionalMeals = params.row.type.toUpperCase() === "SPONSOR"}
					slots={{ toolbar: CustomToolbar }} 
					// slotProps={{
					//   toolbar: { setRows, setRowModesModel },
					// }}
				/>
				<Dialog open={openDelete}>
					<DialogTitle>{`Are you sure you want to delete this team?`}</DialogTitle>
					<DialogActions>
						<Button onClick={handleDeleteTeam}>Yes</Button>
						<Button onClick={handleDeleteNo} autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={openPlayer}>
					<DialogTitle>{`Add New Player`}</DialogTitle>
					<DialogContent>
						<Stack spacing={2}>
							<TextField
								value={newPlayerFullName}
								label="Full Name"
								onChange={e=>{setNewPlayerFullName(e.target.value)}}
							/>
							<TextField
								value={newPlayerEmailAddress}
								label="Email"
								onChange={e=>{setNewPlayerEmailAddress(e.target.value)}}
							/>
							<TextField
								value={newPlayerPhoneNumber}
								label="Phone"
								onChange={e=>{setNewPlayerPhoneNumber(e.target.value)}}
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlePlayerNewYes}>Add</Button>
						<Button onClick={handlePlayerNewNo} autoFocus>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				{playerToDelete && <Dialog open={openDeletePlayer}>
					<DialogTitle>{`Are you sure you want to delete this player?`}</DialogTitle>
					<DialogContent>
						<Typography>{playerToDelete.playerName},&nbsp;&nbsp;{playerToDelete.playerEmail}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDeletePlayerYes}>Yes</Button>
						<Button onClick={handleDeletePlayerNo} autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>}
			</Box>
	</>
}
