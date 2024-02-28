import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';

import { styled } from '@mui/material/styles';
import { PATH_PAGE } from 'src/routes/paths';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { createDonor, sendEmail } from 'src/libs/api';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { BillingForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	textAlign: 'center',
	paddingTop: theme.spacing(6),
	paddingBottom: theme.spacing(4),
	margin: 20,
	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
	},
}));
// ----------------------------------------------------------------------


const DonatePayment = () => {
  	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(false);
	const [amount, setAmount]  = useState();
	const [readyPayment, setReadyPayment] = useState(null);
	const id = "Donation";

	const DonationSchema = Yup.object().shape({
		billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }),
		amount: Yup.number().required('Donation amount is required').round(),
		purpose: Yup.string()
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
		amount: 0,
		purpose: '',
	}

	const methods = useForm({
        resolver: yupResolver(DonationSchema),
        defaultValues,
    });

    const {
		watch,
		setValue,
        handleSubmit,
    } = methods;

	const values = watch();

	useEffect(() => {
		setReadyPayment(null);
	}, []);

	// const onSubmit = async data => {
	// 	setIsLoading(true);
	// 	const params = {
	// 		purpose: data.purpose,
	// 		amount,
	// 		billingAddress: data.billingAddress
	// 	}
	// 	const orderID = await createDonor(params);
	// 	const orderData = `ORDER:${orderID.data}`;

    //     if (orderID.statusCode !== 200) {
    //         enqueueSnackbar('Error creating donor!', {variant: 'error'});
    //     } else {
	// 		navigate(PATH_PAGE.payment("Donation", amount, data.billingAddress.emailAddress, orderData));
    //     }
	// 	setIsLoading(false);
	// }

	const onSubmit = async data => {
		setReadyPayment(data);
	}

	const handlePaymentDone = async () => {
		// setIsLoading(false);

		const params = {
			purpose: readyPayment.purpose,
			amount,
			billingAddress: readyPayment.billingAddress
		}
		const orderID = await createDonor(params);
		// const orderData = `ORDER:${orderID.data}`;
		const emailParams = {
		    emailAddress: readyPayment.billingAddress.emailAddress,
		    orderID: `ORDER:${orderID.data}`,
		    type: id
		}
		await sendEmail(id, emailParams);
		navigate(PATH_PAGE.paymentComplete);
	}

	// const handleDrop = useCallback(
    //     (acceptedFiles) => {
    //       const file = acceptedFiles[0];
    
    //       if (file) {
    //         setValue(
    //           'billingAddress.companyLogo',
    //           Object.assign(file, {
    //             preview: URL.createObjectURL(file),
    //           })
    //         );
    //       }
    //     },
    //     [setValue]
    // );

    // const handleRemove = () => {
    //     setValue("billingAddress.companyLogo", {})
    // }

  	return <>
			{readyPayment ? <SetupPayment
					id={id}
					price={amount}
					emailAddress={readyPayment.billingAddress.emailAddress}
					onPaymentDone={handlePaymentDone}
				/>
			:
			<RootStyle>
				<Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
					<CircularProgress color="primary" />
				</Backdrop>
				<Container>
					<Typography variant="subtitle1">
					On behalf of the Veterans Club at Encanterra we want to thank you for your generous donation. 
					As a 501(c)(3) organization your contribution is fully deductible. Your donation supports veterans 
					organizations in Pinal and Maricopa counties. If you have a specific project/activity in mind, 
					please indicate in the space below or leave it blank.
					</Typography>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={6} sx={{mt: 2}}>
							<Grid item xs={12} md={3}>
							<Typography variant="subtitle1">Contribution amount:</Typography>

								{/* <RHFTextField name="amount" label="Amount"/> */}
								<CurrencyTextField
									// label="Amount"
									variant="outlined"
									value={amount}
									currencySymbol="$"
									//minimumValue="0"
									outputFormat="string"
									decimalCharacter="."
									digitGroupSeparator=","
									onChange={(event, amount)=> setAmount(amount)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="subtitle1" sx={{color: "primary.main", mb: 4}}>
									Please indicate if this donation is to be for a special purpose to help veterans or leave it blank.
								</Typography>
								<RHFTextField name="purpose" multiline rows={4} />
							</Grid>
							<Grid item xs={12}>
								<StepLabel title="Billing Information"/>			
								<BillingForm/>
							</Grid>
							<Grid item xs={12} display='flex' justifyContent='center'>
								<LoadingButton size="large" variant="contained"  type="submit" loading={isLoading}>
									Submit Donation
								</LoadingButton>
							</Grid>
						</Grid>
					</FormProvider>
				</Container>
			</RootStyle>
		}
	</>
}

export default DonatePayment