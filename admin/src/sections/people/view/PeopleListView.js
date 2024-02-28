import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
	Stack,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
	Typography,
	Backdrop,
	Tooltip,
	TextField,
    CircularProgress,
	DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { Mailto } from 'src/components/Mailto';

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
import { paths } from 'src/routes/paths';

import { getUsers } from 'src/libs/api'
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

export default function PeopleListView({ id }) {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
	const [userToDelete, setUserToDelete] = useState();
	const [isLoading, setIsLoading] = useState(false);

    const fetchPeople = async () => {
		setIsLoading(true);
        const params = {
            type: id
        }
        const people = await getUsers(params);
		// console.log("people = ", people)
        if (people) {
            setRows(people);
        }
		setIsLoading(false);
    }

    useEffect(() => {
        fetchPeople();
    }, []);

    const handlePeopleView = (e, row) => {
		e.preventDefault();
		let role = '';
		let id = '';
		if (row.SK.split("#") && row.SK.split("#").length > 1) {
			
			role = row.SK.split("#")[0];
			id = row.SK.split("#")[1];
		} else {
			role = row.PK;
			id = row.SK;
		}
		navigate(paths.dashboard.people.view(row.PK, id, role));
    }

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

	const handleDeleteUser = async () => {
		const row = rows.filter((row) => row.id === userToDelete)[0];
		const params = {
			row
		}
		// const response = await deleteTeam(teamToDelete, params);
		// if (response.statusCode === 200) {
		// 	enqueueSnackbar("Deleted team successfully!");
		// 	setRows(rows.filter((row) => row.id !== teamToDelete));
		// 	setOpenDelete(false);
		// } else {
		// 	enqueueSnackbar("Error deleting team", {variant: "error"});
		// }

	}

	const handleDeleteNo = () => {
        setOpenDelete(false);
    };

	
	const handleDeleteClick = (id) => () => {
		setUserToDelete(id);
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
		// const response = await updateTeam(updatedRow.id, params);
		// if (response.statusCode === 200) {
		// 	enqueueSnackbar("Updated team successfully!");
		// 	setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		// } else {
		// 	enqueueSnackbar("Error updating team", {variant: "error"});
		// }
		// return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleDeleteYes = async () => {
		const row = rows.filter((row) => row.id === userToDelete)[0];
		const params = {
			row
		}
		// const response = await deleteTeam(teamToDelete, params);
		// if (response.statusCode === 200) {
		// 	enqueueSnackbar("Deleted team successfully!");
		// 	setRows(rows.filter((row) => row.id !== teamToDelete));
		// 	setOpenDelete(false);
		// } else {
		// 	enqueueSnackbar("Error deleting team", {variant: "error"});
		// }

	}

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
			field: 'emailAddress', 
			headerName: 'Email', 
			editable: false, 
			// width: 150,
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => (
				<Mailto email={params.value}>
					<Typography variant="caption"  sx={{color: "primary.dark"}}>
						{params.value}
					</Typography>
				</Mailto>
			)
		},
		{ 
			field: 'phoneNumber', 
			headerName: 'Phone', 
			editable: true, 
			flex: 1,
			headerClassName: 'super-app-theme--header',
			renderCell: (params) => 
				(
					<Typography variant='caption' sx={{width: 150, display: 'flex', alignItems: 'center'}}>
					{params.value}
					</Typography>
					
				)

		},
		{ field: 'streetAddress', headerName: 'Street', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
		{ field: 'state', headerName: 'State', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
		{ field: 'city', headerName: 'City', editable: true, flex: 1, headerClassName: 'super-app-theme--header' },
		{ field: 'zipCode', headerName: 'Zip', editable: true, flex: 1,headerClassName: 'super-app-theme--header' },
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
	]

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
					// getRowId={row => row.SK}
					getRowClassName={(params) =>
						params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
					}
					getRowHeight={() => 'auto'}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slots={{ toolbar: GridToolbar }} 
				/>
				<Dialog open={openDelete}>
					<DialogTitle>{`Are you sure you want to delete this user?`}</DialogTitle>
					<DialogActions>
						<Button onClick={handleDeleteYes}>Yes</Button>
						<Button onClick={handleDeleteNo} autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
	</>
}
