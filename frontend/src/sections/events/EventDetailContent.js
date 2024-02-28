import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useResponsive  from 'src/hooks/useResponsive';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { styled } from '@mui/material/styles';
import {
	Box,
	Container,
	Button,
	Stack,
	Typography,
	Backdrop,
	CircularProgress
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Iconify from 'src/components/Iconify';
import { PATH_PAGE } from 'src/routes/paths';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { getEvent, getEventAttendees, createEvent, sendEmail } from 'src/libs/api';
import { fDateTimeString } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
import { BillingForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));
// ----------------------------------------------------------------------

export default function EventDetailContent () {
	const { id, type } = useParams();
    const { enqueueSnackbar } = useSnackbar();
	const upMd = useResponsive('up', 'md');

	const navigate = useNavigate();
	const [ event, setEvent] = useState();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ attendees, setAttendees ] = useState();
	const [ price, setPrice ] = useState();
	const [readyPayment, setReadyPayment] = useState(null);

	const AddressSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }),
		numberOfGuests: Yup.number().required('Number of guests is required').min(0, "Minimum 0 guests allowed").min(0, "Minimum 0 guests allowed").max(4, "Maximum 4 guests allowed"),
    });

    const defaultValues = {
        billingAddress: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: 'Arizona',
            zipCode: '',
        },
		numberOfGuests: 0,
    };

    const methods = useForm({
        resolver: yupResolver(AddressSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        setValue,
		getValues,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

	const fetchEvent = async () => {
		setIsLoading(true);
		const event = await getEvent(id);
		const response = await getEventAttendees(id);
		const totalEventAttendees = response.totalAttendees + response.totalGuests;
		const left = event.extendedProps.totalAttendees - totalEventAttendees;
		setAttendees({total: totalEventAttendees, left});
		setEvent(event);
		let numGuests = 0;
		setValue("numberOfGuests", 0);
		let updatedPrice = 0;
		if (type === "veteran" && event.extendedProps.veteranFree) {
			updatedPrice = 0;
		} else {
			updatedPrice = event.extendedProps.cost;
		}
		setPrice(updatedPrice + (event.extendedProps.cost * numGuests));
		setIsLoading(false);
	}

	useEffect(() => {
		fetchEvent();
		setReadyPayment(null);
	}, []);

	const buildUserEmail = async (readyPayment) => {
		setIsLoading(true);
		if ((attendees.total + readyPayment.numberOfGuests + 1) > event.extendedProps.totalAttendees) {
			enqueueSnackbar(`There are only ${attendees.left} spots left`, {variant: 'error'});
			return;
		}
		const params = {
			eventID: id,
			type,
			category: "Other",
			numberOfGuests: readyPayment.numberOfGuests,
			totalCost: price
		}
		Object.assign(params, readyPayment);

		const response = await createEvent(params);
		// const orderData = `EVENT:${id}`;
		const emailParams = {
		    emailAddress: readyPayment.billingAddress.emailAddress,
		    orderID: `EVENT:${id}`,
		    type: id
		}
		await sendEmail(id, emailParams);
		navigate(PATH_PAGE.paymentComplete);
	}

	const handlePaymentDone = async () => {
		buildUserEmail(readyPayment);
    };

	const onSubmit = async data => {
		if (price > 0) {
			setReadyPayment(data);
		} else {
			buildUserEmail(data);
		}
	}

	const handleChangeGuests = (e) => {
		if (e.target.value > 4) {
			enqueueSnackbar("Maximum 4 guests allowed", {variant: "error"});
			return;
		}
		let numGuests = 0;
		if (e.target.value) {
			numGuests = parseInt(e.target.value);
		} else {
			numGuests = 0;
		}
		setValue("numberOfGuests", numGuests);
		let updatedPrice = 0;
		if (type === "veteran" && event.extendedProps.veteranFree) {
			updatedPrice = 0;
		} else {
			updatedPrice = event.extendedProps.cost;
		}
		setPrice(updatedPrice + (event.extendedProps.cost * numGuests));
	}

    return <>
			{readyPayment ? <SetupPayment
				id={event.title}
				price={price}
				emailAddress={readyPayment.billingAddress.emailAddress}
				onPaymentDone={handlePaymentDone}
			/>
			:
			<RootStyle>
				<Container>
					{event && 
						<Stack spacing={5}>
							<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
								<Stack spacing={4}>
									<Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>
										{event.title}
									</Typography>
									<OverviewItem icon="carbon:information" label="Event Information" text={event.description} />
									<OverviewItem
										icon="carbon:calendar"
										label="Dates"
										text={`${fDateTimeString(event.start)} - ${fDateTimeString(event.end)}`}
									/>
									<OverviewItem icon="carbon:location" label="Location" text={event.extendedProps.location} />
									{event.extendedProps.veteranFree ? 
										<OverviewItem 
											icon="carbon:money" 
											label="Free for Veteran Club members. Cost per guest" 
											text= {fCurrency(event.extendedProps.cost)}
										/>
										:
										<OverviewItem 
											icon="carbon:money" 
											label="Cost per guest and veteran" 
											text= {fCurrency(event.extendedProps.cost)}
										/>
									}

								</Stack>
								<Box sx={{m: 4}}>
									<Stack>
										<StepLabel title="Additional guests (0 to 4)" step="1" />
										<Stack direction="row" spacing={4} sx={{display: 'flex', alignItems: 'center'}}>
											<RHFTextField
												name="numberOfGuests"
												sx={{width: 400}} 
												size="small" 
												type="number"
												// value={guests || 0}
												onChange={handleChangeGuests}
											/>
											<Typography variant="subtitle1" sx={{mr: 2}}>
												Total: 
											</Typography>
											<Typography variant='subtitle2' sx={{ml: 4}}>
												{fCurrency(price)}
											</Typography>
										</Stack>
									</Stack>
								</Box>
								<Box sx={{m: 4}}>
									<StepLabel title="Billing Information" step="2" />
									<BillingForm/>
								</Box>
								<Stack direction="row" sx={{display: 'flex', justifyContent: 'flex-end'}}>
									<LoadingButton
										size="large"
										loading={isLoading}
										type="submit"
										variant="contained"
										sx={{color:"common.white", backgroundColor: 'primary.darker', width:300}}>
											Proceed to Payment
									</LoadingButton>
								</Stack>
							</FormProvider>
						</Stack>                           
					}
				</Container>
		</RootStyle>
		}
	</>
}

function OverviewItem({ icon, label, text = '-' }) {
	const upMd = useResponsive('up', 'md');

	return (
	  <Stack spacing={1.5} direction={upMd ? 'row' : 'column'} alignItems="center">
		<Iconify icon={icon} width={24} />
		<Stack spacing={0.5}>
		  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
			{label}
		  </Typography>
		  <Typography>{text}</Typography>
		</Stack>
	  </Stack>
	);
  }