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
import { alpha, styled } from '@mui/material/styles';
import { Mailto } from 'src/components/Mailto';
import { fDateTimeCustom } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { paths } from 'src/routes/paths';

import { getAllDonors } from 'src/libs/api'
// ----------------------------------------------------------------------

export default function DonorListView({ id }) {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [expandAll, setExpandAll] = useState(true);

    const fetchDonors = async () => {
		setIsLoading(true);
        const params = {
            type: id
        }
        const donors = await getAllDonors(params);
		// console.log("donors = ", donors)
        if (donors) {
            setRows(donors);
        }
		setIsLoading(false);
    }

    useEffect(() => {
        fetchDonors();
    }, []);

	const handleExpand = (event) => {
		setExpandAll(event.target.checked)
	}

    // const handlePeopleView = (e, row) => {
	// 	e.preventDefault();
	// 	let role = '';
	// 	let id = '';
	// 	if (row.SK.split("#") && row.SK.split("#").length > 1) {
			
	// 		role = row.SK.split("#")[0];
	// 		id = row.SK.split("#")[1];
	// 	} else {
	// 		role = row.PK;
	// 		id = row.SK;
	// 	}
	// 	navigate(paths.dashboard.people.view(row.PK, id, role));
    // }

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
					{/* <TableCell component="th" scope="row" sx={{color: "primary.dark"}}>
						{row.type}
					</TableCell> */}
					<TableCell align="left"  sx={{color: "primary.dark"}}>
						{/* <Button sx={{textDecoration: 'underline', width: 150, display: 'flex', justifyContent: 'flex-start'}} onClick={e=>handlePeopleView(e, row.user)}> */}
							<Typography variant='subtitle2'>
								{row.user.fullName}
							</Typography>
						{/* </Button>             */}
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
											<TableCell>Cause</TableCell>
											<TableCell>Amount</TableCell>
											<TableCell>Donated on</TableCell>
		
										</TableRow>
									</TableHead>
									<TableBody>
										{row.donations.map((donationRow) => (
											<TableRow key={donationRow.SK.split("#")[1]}>
												<TableCell>{donationRow.purpose}</TableCell>
												<TableCell>{fCurrency(donationRow.amount)}</TableCell>
												<TableCell component="th" scope="row">
													{fDateTimeCustom(donationRow.createdAt)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
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
			<Stack direction="row" sx={{p: 2}} justifyContent='flex-end'>
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
