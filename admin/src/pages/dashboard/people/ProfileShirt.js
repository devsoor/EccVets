import React, {useEffect, useState } from 'react';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
	Tooltip,
    CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { alpha, styled } from '@mui/material/styles';
import { fDateTimeCustom } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { useSnackbar } from 'src/components/snackbar';
import Label from 'src/components/label';
import { 
  DataGrid, 
	GridToolbarContainer, 
	GridToolbarExport, 
	GridRowModes, 
	GridActionsCellItem ,
	gridClasses,
} from '@mui/x-data-grid';

import { getUserShirts, updateOrderStatus } from 'src/libs/api';

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

// ----------------------------------------------------------------------

const ProfileShirt = ( { type, id} ) => {
    const { enqueueSnackbar } = useSnackbar();

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [openOrder, setOpenOrder] = useState(false);
	const [selected, setSelected] = useState({});

	const fetchUserShirts = async () => {
		setIsLoading(true);
		const params = {
			type
		}
		const response = await getUserShirts(id, params);
		// console.log("getUserShirts: response = ", response)
		if (response) {
			setRows(response);
			const columns = getColumns(id);
			setColumns(columns)
		}
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
		fetchUserShirts();
	}, []);

	const handleOrdered = (event, row, clickType) => {
		setSelected({row, clickType});
		setOpenOrder(true);
	}

	const handleOrderNo = () => {
        setOpenOrder(false);
    };

	const handleOrderYes = async () => {
		setIsLoading(true);
        const params = {
			role: selected.row.PK.split("#")[0],
			id: selected.row.PK.split("#")[1], // user ID
			category: selected.clickType,
			orderType: selected.row.SK.split("#")[0],
			orderID: selected.row.SK.split("#")[1],
		}

		const response = await updateOrderStatus(id, params);
		if (response.statusCode !== 200) {
			enqueueSnackbar("Error updating order", { variant: "error" });
		} else {
			enqueueSnackbar("Updated order status!");
			setOpenOrder(false);
			fetchUserShirts();
		}
		setIsLoading(false);
    };

	const getColumns = (id) => {
		let columns = [
			{
				field: 'size', 
				headerName: 'Size', 
				editable: false, 
				width: 150,
				flex: 1,
				headerClassName: 'super-app-theme--header',
			},
			{
				field: 'gender', 
				headerName: 'Gender', 
				editable: false, 
				width: 100,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
			},
			{
				field: 'type', 
				headerName: 'Type', 
				editable: false, 
				width: 200,
				// flex: 1,
				headerClassName: 'super-app-theme--header',

			},
			{
				field: 'quantity', 
				headerName: 'Quantity', 
				editable: false, 
				// width: 60,
				flex: 1,
				headerClassName: 'super-app-theme--header',
			},
			{
				field: 'price', 
				headerName: 'Price', 
				editable: false, 
				width: 100,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
        		valueFormatter: (params) => fCurrency(params.value)
			},
			{
				field: 'ordered', 
				headerName: 'Ordered', 
				editable: false, 
				width: 100,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => {
					return <>
						{
							!params.value ?
							<Tooltip title="Click to place order">
								<LoadingButton
									loading={isLoading}
									variant="contained"
									size="small"
									sx={{ 
										backgroundColor: params.value ? "success.main" : 'error.main', 
										width: 80, 
										color: "common.white" ,
										'&:hover': "Place Order"
									}}
									onClick={e=>handleOrdered(e, params.row, "order")}
								>
									{params.value ? "Yes" : "No"}
								</LoadingButton>

							</Tooltip>
							:
							<Label
								variant="filled"
								sx={{ backgroundColor: params.value ? "success.main" : 'error.main', width: 80, color: "common.white" }}
								>
								{params.value ? "Yes" : "No"}
							</Label>							
						}
					</>
				}			
			},
			{
				field: 'orderedDate', 
				headerName: 'Order Date', 
				editable: false, 
				width: 240,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
        		valueFormatter: (params) => fDateTimeCustom(params.value)
			},
			{
				field: 'shipped', 
				headerName: 'Shipped', 
				editable: false, 
				width: 100,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
				renderCell: (params) => {
					return <>
						{
							!params.value ?
							<Tooltip title="Click to ship order">
								<LoadingButton
									loading={isLoading}
									variant="contained"
									size="small"
									sx={{ backgroundColor: params.value ? "success.main" : 'error.main', width: 80, color: "common.white" }}
									onClick={e=>handleOrdered(e, params.row, "ship")}
									>
									{params.value ? "Yes" : "No"}
								</LoadingButton>

							</Tooltip>
							:
							<Label
								variant="filled"
								sx={{ backgroundColor: params.value ? "success.main" : 'error.main', width: 80, color: "common.white" }}
								>
								{params.value ? "Yes" : "No"}
							</Label>							
						}
					</>
				}			
			},
			{
				field: 'shipDate', 
				headerName: 'Shipped Date', 
				editable: false, 
				width: 240,
				// flex: 1,
				headerClassName: 'super-app-theme--header',
        		valueFormatter: (params) => fDateTimeCustom(params.value)
			},
		];
		return columns;
	}



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
				rows && <StripedDataGrid
					rows={rows}
					columns={columns}
					getRowId={row => row.SK}
					getRowClassName={(params) =>
						params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
					}
					slots={{ toolbar: CustomToolbar }} 
				/>
			}
 			<Dialog open={openOrder}>
                <DialogTitle>{`Are you sure you want to place this order?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleOrderYes}>Yes</Button>
                    <Button onClick={handleOrderNo} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
		</Box>

	)
}

export default ProfileShirt