import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// utils
import { fDateCustom, fDateTimeCustom } from 'src/utils/format-time';

// assets
import { states } from 'src/data/_states';
import { paths } from 'src/routes/paths';

// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import { createTeamByAdmin, getEventsFilter, getProductsByType } from 'src/libs/api';
import BillingForm from './BillingForm';


// ----------------------------------------------------------------------

export default function TeamNewEditForm({ currentUser }) {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
  	const [isLoading, setIsLoading] = useState(false);
	const [ events, setEvents] = useState();
	const [ products, setProducts] = useState();

	const PlayerSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
        }),
        teamName: Yup.string().required('Team name is required'),
        golfCart: Yup.number().required('Number of golf carts is required'),
		contactType: Yup.string().required('Contact role is required'),
		eventID: Yup.string().required('Event is required'),
		package: Yup.string().required('Package is required'),
    });
    const defaultValues = {
        teamName: '',
        golfCart: 0,
		contactType: '',
		eventID: '',
		package: '',
        billingAddress: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: 'AZ',
            zipCode: '',
        },
        players: [
            {id: 1, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 2, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 3, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 3, fullName: '', emailAddress: '', phoneNumber: ''},
        ],
    };

    const methods = useForm({
        resolver: yupResolver(PlayerSchema),
        defaultValues,
    });

    const {
		watch,
		setValue,
        handleSubmit,
		formState: { isSubmitting },
    } = methods;

	const values = watch();

	const fetchEventsFiltered = async (type, value) => {
		const response = await getEventsFilter({type, value});
		// console.log("fetchEventsFiltered response: ", response)
		const eventList = [];
		response.forEach(item => {
			eventList.push({
				title: item.title,
				date: fDateCustom(item.start),
				id: item.SK
			})
		})
		setEvents(eventList);
	}

    const fetchProducts = async (type) => {
        setIsLoading(true);
		let response;
		if (type === 'SPONSOR') {
			response = await getProductsByType('golfsponsorship');
		} else {
			response = await getProductsByType('playersponsorship');
		}
        setProducts(response);
        setIsLoading(false);
    }

	useEffect(() => {
		fetchEventsFiltered("category", "Golf");
	}, []);

  	const onSubmit = async data => {
		for (let index = 0; index < data.players.length; index+=1){
            if (data.players[index].fullName.length === 0 && data.players[index].emailAddress.length === 0) {
                data.players.splice(index, 1);
                index -= 1;
            }
        } 
		setIsLoading(true);

		const params = {
			billingAddress: data.billingAddress,
			teamName: data.teamName,
            golfCart: data.golfCart,
            players: data.players,
			type: data.contactType,
			package: data.package,
			eventID: data.eventID,
			category: "Golf",
			price: 0,
		}
		try {
			const response = await createTeamByAdmin(params);
			if (response.statusCode === 401) {
				enqueueSnackbar(response.data, {variant: 'error'});
				// setIsLoading(false);
			} else if (response.statusCode === 400) {
				enqueueSnackbar('Error creating golf team', {variant: 'error'});
				// setIsLoading(false);
			} else {
				// setIsLoading(false);
				enqueueSnackbar('Created golf team successfully!');
				navigate(paths.dashboard.golfteam.root)
			}
		} catch(error) {
			enqueueSnackbar(error, {variant: 'error'});

		} finally {
			setIsLoading(false);
		}
	};

	const renderPlayer = (numPlayer) => {
		return <>
		    <Stack direction="row" spacing={1}>
			<Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
				<Typography variant='body2' >Player</Typography>
				<Typography variant='body2' >{numPlayer}: </Typography>

			</Stack>
				<RHFTextField name={`players[${numPlayer-1}].fullName`} label="Full Name" size="small" />
				<RHFTextField name={`players[${numPlayer-1}].emailAddress`} label="Email" size="small" />
				<RHFTextField name={`players[${numPlayer-1}].phoneNumber`} label="Phone" size="small" />
				{/* <RHFTextField name="players[0].emailAddress" label="Email" size="small" />
				<RHFTextField name="players[0].phoneNumber" label="Phone" size="small" /> */}
            </Stack>
		</>
	}

	const handleRoleSelect = (event) => {
		setValue('contactType', event.target.value)
		fetchProducts(event.target.value);
	}

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={4}>
				<Stack spacing={4} direction="row" sx={{display: 'flex', alignItems: 'center'}}>
					<Typography>What event is this team for?</Typography>
					{events && <RHFSelect
						name="eventID"
						label="Event"
						size="small"
						sx={{width: 400}}
					>
						{events.map(option => (
							<MenuItem key={option.id} value={option.id}>
								{`${option.title} on ${option.date}`}
							</MenuItem>
						))}
					</RHFSelect>
					}
				</Stack>
				<Stack spacing={2} sx={{mb: 4}}>
					<RHFTextField name="teamName" label="Team or Lead name" sx={{width: '40%'}} />
					{renderPlayer(1)}
					{renderPlayer(2)}
					{renderPlayer(3)}
					{renderPlayer(4)}
				</Stack>

				<Stack spacing={4} direction="row" sx={{display: 'flex', alignItems: 'center'}}>
					<Typography>How many golf carts does this team need?</Typography>
					<RHFSelect
						name="golfCart"
						size="small"
						sx={{width: 100}}
					>
						{[0,1,2].map(option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</RHFSelect>
				</Stack>

				<Typography variant="h6">Main Contact Information</Typography>
				<Stack spacing={4} direction="row" sx={{display: 'flex', alignItems: 'center'}}>

					<Stack spacing={4} direction="row" sx={{display: 'flex', alignItems: 'center'}}>
						<Typography>What is the main contact's role?</Typography>
						<RHFSelect
							name="contactType"
							label="Type"
							size="small"
							onChange={handleRoleSelect}
							sx={{width: 200}}
						>
							{['SPONSOR', 'VETERAN', 'COMMUNITY'].map(option => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</RHFSelect>
					</Stack>
					{products && <Stack spacing={4} direction="row" sx={{display: 'flex', alignItems: 'center'}}>
						<Typography>Package</Typography>
						<RHFSelect
							name="package"
							label="Type"
							size="small"
							sx={{width: 200}}
						>
							{products.map(option => (
								<MenuItem key={option.id} value={option.id}>
									{option.id}
								</MenuItem>
							))}
						</RHFSelect>
					</Stack>}
					{isLoading && <CircularProgress />}
				</Stack>

				<BillingForm />

			</Stack>
			<Box sx={{mb: 6}} display='flex' justifyContent='flex-end'>
				<LoadingButton
					loading={isSubmitting} 
					type="submit" 
					variant='contained' 
				>
					Create
				</LoadingButton>
			</Box>
		</FormProvider>
	);
}
