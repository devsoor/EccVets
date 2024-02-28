import React, { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Storage } from 'aws-amplify';

import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Stack, Container, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { FormProvider, RHFTextField, RHFCheckbox, RHFUploadLogo, RHFSelect } from '../../components/hook-form';
import { PATH_PAGE } from 'src/routes/paths';

import { createSponsor, sendEmail } from 'src/libs/api';
import { BillingSponsorForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
    },
}));

// ----------------------------------------------------------------------

export default function GolfSponsorForm() {
    const { id, price, eventID } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [readyPayment, setReadyPayment] = useState(null);

    const SponsorSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
            companyName: Yup.string().required('Company name is required'),
        }),
        teamName: Yup.string().required('Team name is required'),
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
            companyLogo: {},
            companyName: '',
        },
        teamName: '',
        // additionalMeals: false,
        golfCart: 0,
        players: [
            { id: 1, fullName: '', emailAddress: '', phoneNumber: '' },
            { id: 2, fullName: '', emailAddress: '', phoneNumber: '' },
            { id: 3, fullName: '', emailAddress: '', phoneNumber: '' },
            { id: 3, fullName: '', emailAddress: '', phoneNumber: '' },
        ],
    };

    const methods = useForm({
        resolver: yupResolver(SponsorSchema),
        defaultValues,
    });

    const {
        watch,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
		setReadyPayment(null);
	}, []);

    const onSubmit = async data => {
		setReadyPayment(data);
	}

    const handlePaymentDone = async data => {
        // console.log("DATA = ", data)
        setIsLoading(true);
        for (let index = 0; index < readyPayment.players.length; index += 1) {
            if (readyPayment.players[index].fullName.length === 0 && readyPayment.players[index].emailAddress.length === 0) {
                readyPayment.players.splice(index, 1);
                index -= 1;
            }
        }

        const params = {
            billingAddress: readyPayment.billingAddress,
            teamName: readyPayment.teamName,
            // additionalMeals: data.additionalMeals,
            golfCart: readyPayment.golfCart,
            players: readyPayment.players,
            type: 'sponsor',
            package: id,
            eventID,
            category: 'Golf',
            price,
        };

        const response = await createSponsor(params);
        // const orderData = `EVENT:${eventID}`;

        if (response.statusCode !== 200) {
            enqueueSnackbar('Error creating sponsor!', { variant: 'error' });
            setIsLoading(false);
        } else {
            setIsLoading(false);
            const emailParams = {
                emailAddress: readyPayment.billingAddress.emailAddress,
                orderID: `EVENT:${eventID}`,
                type: id
            }
            await sendEmail(id, emailParams);
            navigate(PATH_PAGE.paymentComplete);
        }
    };

    const handleDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'billingAddress.companyLogo',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const handleRemove = () => {
        setValue('billingAddress.companyLogo', {});
    };

    return <>
    		{readyPayment ? <SetupPayment
				id={id}
				price={price}
				emailAddress={readyPayment.billingAddress.emailAddress}
				onPaymentDone={handlePaymentDone}
			/>
			:
            <RootStyle>
                <Container>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction="row">
                            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                                Sponsor Package selected:&nbsp; &nbsp;
                            </Typography>
                            <Typography sx={{ color: 'primary.light' }}>{id}</Typography>
                        </Stack>

                        <StepLabel title="Billing Information" step="1" />
                        <BillingSponsorForm onDropLogo={handleDrop} onRemoveLogo={handleRemove} />

                        { id !== "Good Conduct"  && <>
                        <Stack spacing={4} direction="row" sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                                {/* <RHFCheckbox name="additionalMeals" label="Additional meals (extra cost). Only one per sponsor’s foursome" /> */}
                                {/* <Stack  spacing={4} sx={{mt: 4, mb: 4}}> */}
                                <Typography>How many golf carts do you need?</Typography>
                                <RHFSelect
                                    name="golfCart"
                                    // label="Golf Carts"
                                    size="small"
                                    sx={{ width: 100 }}
                                >
                                    {[0, 1, 2].map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </RHFSelect>
                                {/* </Stack> */}
                            </Stack>
                            <Stack spacing={4} sx={{ mt: 4, mb: 4 }}>
                                <StepLabel title="Players Information" step="2" />
                                <RHFTextField name="teamName" label="Team name" sx={{ width: 600 }} />
                                <Typography variant="caption">(Enter up to four names)</Typography>
                            </Stack>

                            <Stack spacing={2} sx={{ mb: 4 }}>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" sx={{ width: '10%' }}>
                                        Player 1:
                                    </Typography>
                                    <RHFTextField
                                        name="players[0].fullName"
                                        label="Full Name"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[0].emailAddress"
                                        label="Email"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[0].phoneNumber"
                                        label="Phone"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" sx={{ width: '10%' }}>
                                        Player 2:
                                    </Typography>
                                    <RHFTextField
                                        name="players[1].fullName"
                                        label="Full Name"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[1].emailAddress"
                                        label="Email"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[1].phoneNumber"
                                        label="Phone"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" sx={{ width: '10%' }}>
                                        Player 3:
                                    </Typography>
                                    <RHFTextField
                                        name="players[2].fullName"
                                        label="Full Name"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[2].emailAddress"
                                        label="Email"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[2].phoneNumber"
                                        label="Phone"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" sx={{ width: '10%' }}>
                                        Player 4:
                                    </Typography>
                                    <RHFTextField
                                        name="players[3].fullName"
                                        label="Full Name"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[3].emailAddress"
                                        label="Email"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                    <RHFTextField
                                        name="players[3].phoneNumber"
                                        label="Phone"
                                        size="small"
                                        sx={{ width: '30%' }}
                                    />
                                </Stack>
                            </Stack>
                        </>
                        }
                        
                        <Box sx={{ mb: 6 }} display="flex" justifyContent="flex-end">
                            <LoadingButton loading={isLoading} type="submit" variant="contained">
                                Proceed to payment
                            </LoadingButton>
                        </Box>
                    </FormProvider>
                </Container>
            </RootStyle>
        }
    </>
}
