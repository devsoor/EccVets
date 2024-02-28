import React, {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';

import { alpha, styled } from '@mui/material/styles';
import { fDateTimeCustom } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { 
	DataGrid, 
	GridToolbarContainer, 
	GridToolbarExport, 
	GridRowModes, 
	GridActionsCellItem ,
	gridClasses,
	GridRowEditStopReasons,
} from '@mui/x-data-grid';
import uuidv4 from 'src/utils/uuidv4';

import { getUserEvents, getEventTeamPlayers } from 'src/libs/api';

// ----------------------------------------------------------------------

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
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

const PlayerDatagridStyle = styled(Paper)(({ theme }) => ({
    editable: true,
    display: 'flex',
    alignItems: 'center',
	height: 400, width: '100%',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(0, 2),
    justifyContent: 'space-between',
    transition: theme.transitions.create('all'),
    border: `solid 1px ${theme.palette.divider}`,
    [`& .${gridClasses.row}`]: {
        backgroundColor: theme.palette.grey[200],
        cursor: "pointer",
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
          cursor: "pointer",
        },
        '&.Mui-selected': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
          cursor: "pointer",
          '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY +
                theme.palette.action.selectedOpacity +
                theme.palette.action.hoverOpacity,
            ),
            cursor: "pointer",
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
              ),
              cursor: "pointer",
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

// function EditToolbar(props) {
// 	const { setRows, setRowModesModel } = props;
  
// 	const handleClick = () => {
// 	  const id = uuidv4();
// 	  setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
// 	  setRowModesModel((oldModel) => ({
// 		...oldModel,
// 		[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
// 	  }));
// 	};
  
// 	return (
// 	  <GridToolbarContainer>
// 		<Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
// 		  Add Player
// 		</Button>
// 	  </GridToolbarContainer>
// 	);
// }

const ProfileEvents = ( { type, id} ) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
	const [selectionModel, setSelectionModel] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [teamOpen, setTeamOpen] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState();

	const fetchUserEvents = async () => {
		setIsLoading(true);
		const params = {
			type
		}
		const response = await getUserEvents(id, params);
		// console.log("getUserEvents response = ", response)
		setRows(response);
		const columns = getColumns(id);
		setColumns(columns)
		setIsLoading(false);

	}

	function CustomToolbar() {
		return (
		  <GridToolbarContainer sx={{justifyContent: 'space-between', background: 'transparent'}}>
			{/* <Typography variant="overline" display="block" gutterBottom>Events list</Typography> */}
			<GridToolbarExport
				csvOptions={{
					fileName: id,
					delimiter: ';',
					utf8WithBom: true,
				}}
			/>
		  </GridToolbarContainer>
		);
	}
	
	useEffect(() => {
		fetchUserEvents();
	}, []);

	const handleTeamView = async ( e, team, teamName ) => {
		e.preventDefault();
		setIsLoading(true);
		const teamID = team.split("#")[1];
		const teamPlayers = await getEventTeamPlayers(teamID);
		setSelectedTeam({teamName, teamPlayers})
		setTeamOpen(true);
		setIsLoading(false);

	}

	const getColumns = (id) => {
		let columns = [
			{
				field: 'title', 
				headerName: 'Title', 
				editable: false, 
				width: 150,
				flex: 1,
				headerClassName: 'super-app-theme--header',
			},
			{
				field: 'startDate', 
				headerName: 'Start', 
				editable: false, 
				width: 150,
				flex: 1,
				headerClassName: 'super-app-theme--header',
				valueFormatter: (params) => fDateTimeCustom(params.value)
			},
			{
				field: 'endDate', 
				headerName: 'End', 
				editable: false, 
				width: 150,
				flex: 1,
				headerClassName: 'super-app-theme--header',
				valueFormatter: (params) => fDateTimeCustom(params.value)
			},
			{
				field: 'location', 
				headerName: 'Location', 
				editable: false, 
				width: 200,
				flex: 1,
				headerClassName: 'super-app-theme--header',

			},
			{ field: 'package', headerName: 'Package', editable: false, flex: 1, headerClassName: 'super-app-theme--header' },
			{
				field: 'price', 
				headerName: 'Price', 
				editable: false, 
				width: 100,
				flex: 1,
				headerClassName: 'super-app-theme--header',
				valueFormatter: (params) => fCurrency(params.value)
			},
			{
				field: 'teamName', 
				headerName: 'Team', 
				editable: false, 
				width: 150,
				flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => (
					<Tooltip title="Go to user">
						<Button
							sx={{textDecoration: 'underline', width: 150, display: 'flex', justifyContent: 'flex-start'}} 
							onClick={e=>handleTeamView(e, params.row.team, params.row.teamName)}
						>
							<Typography variant='subtitle2'>
								{params.row.teamName}
							</Typography>
						</Button>            
					</Tooltip>
				)
			},
		];
		return columns;
	}

	const handleSelectionModel = id => {
        setSelectionModel(id);
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
	
	const handleDeleteClick = (id) => () => {
		setRows(rows.filter((row) => row.id !== id));
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
	
	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const playerColumns = [
        { field: 'fullName', headerName: 'Name', width: 200, editable: false},
        { field: 'emailAddress', headerName: 'Email', width: 200, editable: false},
        { field: 'phoneNumber', headerName: 'Phone', width: 200, editable: false},
		// {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 100,
        //     cellClassName: 'actions',
        //     getActions: ({ id }) => {
		// 		const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

		// 		if (isInEditMode) {
		// 		  return [
		// 			<GridActionsCellItem
		// 			  icon={<SaveIcon />}
		// 			  label="Save"
		// 			  sx={{
		// 				color: 'primary.main',
		// 			  }}
		// 			  onClick={handleSaveClick(id)}
		// 			/>,
		// 			<GridActionsCellItem
		// 			  icon={<CancelIcon />}
		// 			  label="Cancel"
		// 			  className="textPrimary"
		// 			  onClick={handleCancelClick(id)}
		// 			  color="inherit"
		// 			/>,
		// 		  ];
		// 		}
		
		// 		return [
		// 		  <GridActionsCellItem
		// 			icon={<EditIcon />}
		// 			label="Edit"
		// 			className="textPrimary"
		// 			onClick={handleEditClick(id)}
		// 			color="inherit"
		// 		  />,
		// 		  <GridActionsCellItem
		// 			icon={<DeleteIcon />}
		// 			label="Delete"
		// 			onClick={handleDeleteClick(id)}
		// 			color="inherit"
		// 		  />,
		// 		];
        //     },
        // },
    ]

	const handleClose = () => {
		setTeamOpen(false);
	};

	return (

		<Box 
			sx={{ height: 400, width: '100%', 
			'& .super-app-theme--header': {
				backgroundColor: 'info.dark',
				color: 'common.white'
			}, 
			}}
		>
			{isLoading ? <CircularProgress/> :
				<StripedDataGrid
					rows={rows}
					columns={columns}
					getRowId={row => row.SK}
					getRowClassName={(params) =>
						params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
					}
					slots={{ toolbar: CustomToolbar }} 
				/>
			}
			{selectedTeam && 
				<Dialog fullWidth maxWidth="md" open={teamOpen}>
					<DialogTitle sx={{p: 1, display: 'flex', justifyContent: 'center'}}> {selectedTeam.teamName} </DialogTitle>
					<DialogContent sx={{ height: 400, width: '100%'}}>
						{selectedTeam.teamPlayers && 
							<PlayerDatagridStyle  sx={{ height: 800, width: '100%', editable: false }}>
								<DataGrid
									rows={selectedTeam.teamPlayers}
									columns={playerColumns}
									getRowId={(row) => row.SK.split("#")[1]}
									// editMode="row"
									// rowModesModel={rowModesModel}
									// onRowModesModelChange={handleRowModesModelChange}
									// onRowEditStart={handleRowEditStart}
									// onRowEditStop={handleRowEditStop}
									// processRowUpdate={processRowUpdate}
									// slots={{
									//   toolbar: EditToolbar,
									// }}
									// slotProps={{
									//   toolbar: { setRows, setRowModesModel },
									// }}
								/>
								
							</PlayerDatagridStyle>
								

						}
						
					</DialogContent>
					<DialogActions>
							<Button variant="contained" onClick={handleClose} autoFocus>OK</Button>
						</DialogActions>
				</Dialog>
			}
		</Box>
	)
}

export default ProfileEvents