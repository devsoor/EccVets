import { useState, useEffect, Fragment } from 'react';
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
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Switch,
    CircularProgress,
	Select,
	IconButton,
	Paper,
	Collapse,
	InputLabel,
	MenuItem,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LoadingButton from '@mui/lab/LoadingButton';
import Label from 'src/components/label';
import { Mailto } from 'src/components/Mailto';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useSnackbar } from 'src/components/snackbar';

import { fDateTimeCustom } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { paths } from 'src/routes/paths';

import { updateOrderStatus, getAllUsersShirts, getAllUsersShirtsFilter } from 'src/libs/api';

// ----------------------------------------------------------------------

export default function ShirtListView() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [openOrder, setOpenOrder] = useState(false);
	const [selected, setSelected] = useState({});
	const [expandAll, setExpandAll] = useState(true);
	const [filter, setFilter] = useState("all");

    const fetchAllShirts = async () => {
		setIsLoading(true);
		const shirts = await getAllUsersShirts();
		// console.log("shirts = ", shirts)
        if (shirts) {
            setRows(shirts);
        }
		setIsLoading(false);
    }

    const fetchAllShirtsFilter = async (filter) => {
		setIsLoading(true);
		setFilter(filter);
		const shirtsFiltered = await getAllUsersShirtsFilter(filter);
		// console.log("shirtsFiltered = ", shirtsFiltered)
        if (shirtsFiltered) {
            setRows(shirtsFiltered);
        }
		setIsLoading(false);
    }

    useEffect(() => {
        fetchAllShirts();
    }, []);

    const handlePeopleView = (e, row) => {
		e.preventDefault();
		let role = '';
		let id = '';
			
		role = row.SK.split("#")[0];
		id = row.SK.split("#")[1];
		navigate(paths.dashboard.people.view(role, id, role));
    }

	const handleOrdered = (event, row, clickType) => {
		setSelected({row, clickType});
		setOpenOrder(true);
	}

	const handleOrderNo = () => {
        setOpenOrder(false);
    };

	const handleOrderYes = async () => {
		setIsLoading(true);
		const id = selected.row.PK.split("#")[1];
        const params = {
			role: selected.row.PK.split("#")[0],
			id, // user ID
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
			fetchAllShirts();
		}
		setIsLoading(false);
    };

	const handleExpand = (event) => {
		setExpandAll(event.target.checked)
	}

	const handleFilter = (event) => {
		fetchAllShirtsFilter(event.target.value);
	}

	function Row(props) {
		const { row } = props;
		const [open, setOpen] = useState(expandAll);
	  
		return (
			<Fragment>
				<TableRow sx={{backgroundColor: 'grey.300'}}>
					<TableCell >
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
						{open ? <KeyboardArrowUpIcon sx={{color: "primary.dark"}}/> : <KeyboardArrowDownIcon sx={{color: "primary.dark"}}/>}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row" sx={{color: "primary.dark"}}>
						{row.type}
					</TableCell>
					<TableCell align="left"  sx={{color: "primary.dark"}}>
						<Button sx={{textDecoration: 'underline', width: 150, display: 'flex', justifyContent: 'flex-start'}} onClick={e=>handlePeopleView(e, row.user)}>
							<Typography variant='subtitle2'>
								{row.user.fullName}
							</Typography>
						</Button>            
					</TableCell>
					<TableCell align="left"  sx={{color: "common.white"}}>
						<Mailto email={row.user.emailAddress}>
							<Typography variant="subtitle2"  sx={{color: "primary.dark"}}>
								{row.user.emailAddress}
							</Typography>
						</Mailto>
					</TableCell>
					<TableCell align="left"  sx={{color: "primary.dark"}}>{row.user.phoneNumber}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								{/* <Typography variant="h6" gutterBottom component="div">
								Shirts
								</Typography> */}
								<Table size="small" aria-label="shirts">
									<TableHead>
										<TableRow>
											<TableCell>Branch of Service</TableCell>
											<TableCell>Bought on</TableCell>
											<TableCell>Size</TableCell>
											<TableCell>Gender</TableCell>
											<TableCell>Quantity</TableCell>
											<TableCell>Price</TableCell>
											<TableCell>Ordered</TableCell>
											<TableCell>Order Date</TableCell>
											<TableCell>Shipped</TableCell>
											<TableCell>Ship Date</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{row.userShirts.map((shirtRow) => (
											<TableRow key={shirtRow.SK}>
												<TableCell>{shirtRow.type}</TableCell>
												<TableCell component="th" scope="row">
													{fDateTimeCustom(shirtRow.createdAt)}
												</TableCell>
												<TableCell>{shirtRow.size}</TableCell>
												<TableCell>{shirtRow.gender}</TableCell>
												<TableCell>{shirtRow.quantity}</TableCell>
												<TableCell>{fCurrency(shirtRow.price)}</TableCell>
												<TableCell>
													{
														!shirtRow.ordered ?
															// <Tooltip title="Click to place order">
																<LoadingButton
																	loading={isLoading}
																	variant="contained"
																	size="small"
																	sx={{ 
																		backgroundColor: shirtRow.ordered ? "success.main" : 'error.main', 
																		width: 80, 
																		color: "common.white" ,
																		'&:hover': "Place Order"
																	}}
																	onClick={e=>handleOrdered(e, shirtRow, "order")}
																>
																	{shirtRow.ordered ? "Yes" : "No"}
																</LoadingButton>

															// </Tooltip>
															:
															<Label
																variant="filled"
																sx={{ backgroundColor: shirtRow.ordered ? "success.main" : 'error.main', width: 80, color: "common.white" }}
																>
																{shirtRow.ordered ? "Yes" : "No"}
															</Label>
													}
												</TableCell>
												<TableCell align="left">{fDateTimeCustom(shirtRow.orderedDate)}</TableCell>
												<TableCell>
													{
														!shirtRow.shipped ?
															// <Tooltip title="Click to ship order">
																<LoadingButton
																	loading={isLoading}
																	variant="contained"
																	size="small"
																	sx={{ 
																		backgroundColor: shirtRow.shipped ? "success.main" : 'error.main', 
																		width: 80, 
																		color: "common.white" ,
																		'&:hover': "Place Order"
																	}}
																	onClick={e=>handleOrdered(e, shirtRow, "ship")}
																>
																	{shirtRow.shipped ? "Yes" : "No"}
																</LoadingButton>

															// </Tooltip>
															:
															<Label
																variant="filled"
																sx={{ backgroundColor: shirtRow.shipped ? "success.main" : 'error.main', width: 80, color: "common.white" }}
																>
																{shirtRow.shipped ? "Yes" : "No"}
															</Label>
													}
												</TableCell>
												<TableCell>{fDateTimeCustom(shirtRow.shipDate)}</TableCell>
											</TableRow>
										))}
									</TableBody>
									<Dialog open={openOrder}>
									<DialogTitle>{`Are you sure you want to ${selected.clickType}?`}</DialogTitle>
										<DialogActions>
											<Button onClick={handleOrderYes}>Yes</Button>
											<Button onClick={handleOrderNo} autoFocus>
												No
											</Button>
										</DialogActions>
									</Dialog>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</Fragment>
		);
	  }
	  
	return (
		<TableContainer component={Paper} sx={{p: 2}}>
			<Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
				<CircularProgress color="primary" />
			</Backdrop>
			<Stack direction="row" sx={{p: 2}} justifyContent='space-between'>
				<Stack direction="row" spacing={1} alignItems='center'>
					<InputLabel sx={{mr: 2}}>Show</InputLabel>
					<FormControl sx={{  minWidth: 160 }}>
						<Select
							autoFocus
							size="small"
							value={filter}
							onChange={handleFilter}
							label="filter"
						>
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="ordered">Ordered</MenuItem>
							<MenuItem value="notOrdered">Not Ordered</MenuItem>
							<MenuItem value="shipped">Shipped</MenuItem>
							<MenuItem value="notShipped">Not Shipped</MenuItem>
							<MenuItem value="orderedAndShipped">Ordered & Shipped</MenuItem>
						</Select>
					</FormControl>
				</Stack>
				<FormControlLabel
					control={
						<Switch
						size="small"
						name="expandAll"
						checked={expandAll}
						onChange={handleExpand}
						/>
					}
					label={expandAll ? 'Collapse all' : 'Expand All'}
				/>
		</Stack>
		<Table aria-label="Users">
			{/* <TableHead>
			  <TableRow>
				<TableCell />
				<TableCell>User Type</TableCell>
				<TableCell align="left">Full Name</TableCell>
				<TableCell align="left">Email</TableCell>
				<TableCell align="left">Phone</TableCell>
			  </TableRow>
			</TableHead> */}
			<TableBody>
				{rows && rows.map((row) => (
					<Row key={row.id} row={row} />
				))}
			</TableBody>
		  </Table>
		</TableContainer>
	  );
}
