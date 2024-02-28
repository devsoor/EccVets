import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Box,
    Stack,
    Button,
    Container,
    Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { FormProvider, RHFTextField, RHFSelect } from 'src/components/hook-form';
import { PATH_PAGE } from 'src/routes/paths';

import { createTeam, sendEmail } from 'src/libs/api';
import { BillingForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
    },
}));

// ----------------------------------------------------------------------

export default function GolfPlayerForm() {
    const { id, price, type, eventID } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const [numPlayers, setNumPlayers] = useState();
    const [numGolfCarts, setNumGolfCarts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [readyPayment, setReadyPayment] = useState(null);

    const PlayerSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }),
        teamName: Yup.string().required('Team name is required'),
        golfCart: Yup.number().required('Number of golf carts is required'),
    });
    const defaultValues = {
        teamName: '',
        golfCart: 0,
        billingAddress: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: 'Arizona',
            zipCode: '',
        },
        players: [
            {id: 1, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 2, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 3, fullName: '', emailAddress: '', phoneNumber: ''},
            {id: 3, fullName: '', emailAddress: '', phoneNumber: ''},
        ]
    };

    const methods = useForm({
        resolver: yupResolver(PlayerSchema),
        defaultValues,
    });

    const {
        handleSubmit,
    } = methods;

    useEffect(() => {
        setReadyPayment(null);
        let numPlayers = [];
        switch (id) {
            case "Single Player":
                numPlayers = [0, 1];
                break;
            case "Twosome":
                numPlayers = [0, 1];
                break;
            case "Threesome":
                numPlayers = [0, 1, 2];
                break;
            case "Foursome":
                numPlayers = [0, 1, 2];
                break;
            default:
                break;
        }
        setNumGolfCarts(numPlayers)
    }, []);

    const onSubmit = async data => {
		setReadyPayment(data);
	}

    const handlePaymentDone = async () => {
        setIsLoading(true);
       
        for (let index = 0; index < readyPayment.players.length; index+=1){
            if (readyPayment.players[index].fullName.length === 0 && readyPayment.players[index].emailAddress.length === 0) {
                readyPayment.players.splice(index, 1);
                index -= 1;
            }
        } 
        switch (id) {
            case "Single Player":
                if (readyPayment.players.length !== 1) {
                    enqueueSnackbar("You must enter information for one player", {variant: "error"});
                    setIsLoading(false);
                    return;
                }
                break;
            case "Twosome":
                if (readyPayment.players.length !== 2) {
                    enqueueSnackbar("You must enter information for two players", {variant: "error"});
                    setIsLoading(false);
                    return;
                }
                break;
            case "Threesome":
                if (readyPayment.players.length !== 3) {
                    enqueueSnackbar("You must enter information for three players", {variant: "error"});
                    setIsLoading(false);
                    return;
                }
                break;
            case "Foursome":
                if (readyPayment.players.length !== 4) {
                    enqueueSnackbar("You must enter information for four players", {variant: "error"});
                    setIsLoading(false);
                    return;
                }
                break;
            default:
                break;
        }
        const params = {
            billingAddress: readyPayment.billingAddress,
            teamName: readyPayment.teamName,
            golfCart: readyPayment.golfCart,
            players: readyPayment.players,
            type,
            package: id,
            eventID,
            category: "Golf",
            price
        }
        const response = await createTeam(params);
        // const orderData = `EVENT:${eventID}`;

        if (response.statusCode !== 200) {
            enqueueSnackbar('Error creating player!', {variant: 'error'});
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

    return <>
        	{readyPayment ? <SetupPayment
				id={id}
				price={price}
				emailAddress={readyPayment.billingAddress.emailAddress}
				onPaymentDone={handlePaymentDone}
			/>
			:
                <RootStyle>
                    <Container sx={{ mb: 10 }}>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Stack direction='row'>
                                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                                        Player Package selected:&nbsp; &nbsp;
                                    </Typography>
                                    <Typography  sx={{ color: 'secondary.light' }}>
                                        {id}
                                    </Typography>
                            </Stack>

                            <StepLabel title="Billing Information" />
                            <BillingForm />

                            <Stack spacing={4} sx={{mt: 4, mb: 4}}>
                                <Stack spacing={4} direction="row" sx={{mt: 4, display: 'flex', alignItems: 'center'}}>
                                    <Typography>How many golf carts do you need?</Typography>
                                    {numGolfCarts &&  <RHFSelect
                                        name="golfCart"
                                        size="small"
                                        // label="Golf Carts"
                                        sx={{width: 100}}
                                    >
                                        {numGolfCarts.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </RHFSelect>
                                    }
                                </Stack>
                            {/* </Stack> */}
                                <RHFTextField name="teamName" label="Team or Lead name" sx={{width: '40%'}} />
                            </Stack>


                            <Stack spacing={2} sx={{mb: 4}}>
                                    <Stack direction="row" spacing={1}>
                                        <Typography variant='body2' sx={{width: '10%'}}>Player 1:</Typography>
                                        <RHFTextField name="players[0].fullName" label="Full Name" size="small" sx={{width: '40%'}}/>
                                        <RHFTextField name="players[0].emailAddress" label="Email" size="small" sx={{width: '40%'}}/>
                                        <RHFTextField name="players[0].phoneNumber" label="Phone" size="small" sx={{width: '40%'}}/>
                                    </Stack>
                                    {(id === "Twosome" || id === "Threesome" || id === "Foursome") &&
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant='body2' sx={{width: '10%'}}>Player 2:</Typography>
                                            <RHFTextField name="players[1].fullName" label="Full Name" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[1].emailAddress" label="Email" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[1].phoneNumber" label="Phone" size="small" sx={{width: '40%'}}/>
                                        </Stack>
                                    }
                                    {(id === "Threesome" || id === "Foursome") &&
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant='body2' sx={{width: '10%'}}>Player 3:</Typography>
                                            <RHFTextField name="players[2].fullName" label="Full Name" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[2].emailAddress" label="Email" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[2].phoneNumber" label="Phone" size="small" sx={{width: '40%'}}/>
                                        </Stack>
                                    }
                                    {id === "Foursome" &&
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant='body2' sx={{width: '10%'}}>Player 4:</Typography>
                                            <RHFTextField name="players[3].fullName" label="Full Name" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[3].emailAddress" label="Email" size="small" sx={{width: '40%'}}/>
                                            <RHFTextField name="players[3].phoneNumber" label="Phone" size="small" sx={{width: '40%'}}/>
                                        </Stack>
                                    }
                            </Stack>
                            <Box sx={{mb: 6}} display='flex' justifyContent='flex-end'>
                            <LoadingButton
                                    loading={isLoading} 
                                    type="submit" 
                                    variant='contained' 
                                >
                                    Proceed to payment
                                </LoadingButton>
                            </Box>
                        </FormProvider>
                    </Container>
                </RootStyle>
        }
        </>
}
