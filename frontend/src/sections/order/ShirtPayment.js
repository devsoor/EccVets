import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import  useResponsive  from 'src/hooks/useResponsive';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { 
    Box, 
    Container, 
    Typography, 
    Grid,
    Button, 
    Stack, 
    MenuItem, 
    Card,
    FormControl,
    Select,
    Divider
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFSelect } from 'src/components/hook-form';
import { fCurrency, fPercent } from '../../utils/formatNumber';

import CircularProgress from '@mui/material/CircularProgress';
import { PATH_PAGE } from 'src/routes/paths';
import { ROLES } from 'src/config';

import Incrementer from '../../utils/Incrementer';
import Image from 'src/components/Image';

import { createVeteranShirtBuyer, sendEmail, getProducts } from 'src/libs/api';

import { BillingForm, StepLabel } from '../checkout';
import SetupPayment from 'src/pages/SetupPayment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    margin: 20,
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ["Male", "Female"];
const SIZE_OPTIONS = ["Small", "Medium", "Large", "X-Large", "2X", "3X"];

export default function ShirtPayment() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const lgUp = useResponsive('up', 'lg');
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [productGender, setProductGender] = useState();
    const [productSize, setProductSize] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productTotalQuantity, setProductTotalQuantity] = useState();
    const [price, setPrice] = useState(0);
    const [addButtonDisable, setAddButtonDisable] = useState();
    const [readyPayment, setReadyPayment] = useState(null);

    const id = "Red Shirt";

    const ShirtOrderSchema = Yup.object().shape({
        billingAddress: Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            emailAddress: Yup.string().required('Email address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().required('Zip code is required'),
        }),
        role: Yup.string().required('Role is required'),
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
        role: 'Veteran'
    };

    const methods = useForm({
        resolver: yupResolver(ShirtOrderSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const resetProducts = (products) => {
        const productGenderList = {};
        const productSizeList = {};
        const productQuantityList = {};
        const productTotalQuantityList = {};
        const addButtonDisableList = {};
        products.forEach(product => {
            productGenderList[product.id] = GENDER_OPTIONS[0];
            productSizeList[product.id] = SIZE_OPTIONS[0];
            productQuantityList[product.id] = 0;
            productTotalQuantityList[product.id] = 0;
            addButtonDisableList[product.id] = true;
        })

        setProductGender(productGenderList);
        setProductSize(productSizeList);
        setProductQuantity(productQuantityList);
        setProductTotalQuantity(productTotalQuantityList);
        setAddButtonDisable(addButtonDisableList);
    }

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await getProducts('redshirt');
        setProducts(response);
        resetProducts(response);
        setIsLoading(false);
    }
    
    useEffect(() => {
        setReadyPayment(null);
        fetchProducts();
    }, []);

    // const fetchOrderSendEmail = async (id, emailAddress, orderData) => {
    //     // const order = await getOrder(orderID);
    //     // console.log("fetchOrder: order = ", order)
    //     const emailParams = {
    //         emailAddress,
    //         orderID: orderData,
    //         type: id
    //     }
    //     await sendEmail(id, emailParams);
    //     navigate(PATH_PAGE.paymentComplete);
    // }

    const buildUserEmail = async (readyPayment) => {
        setIsLoading(true);
        const shirts = [];
        let defaultPrice, shirtPrice;

        Object.entries(productQuantity).forEach(([key, value]) => {
            if (value > 0) {
                defaultPrice = products.filter(p => p.id === key)[0].price;
                shirtPrice = defaultPrice * productQuantity[key];
                shirts.push({
                    type: key,
                    size: productSize[key],
                    gender: productGender[key],
                    quantity: value,
                    price: shirtPrice
                })
            }
        });
        const params = {
            type: readyPayment.role.toUpperCase(),
            billingAddress: readyPayment.billingAddress,
            shirts,
            price
        };
        
        const orderID = await createVeteranShirtBuyer(params);
        // const orderData = `ORDER:${orderID.data}`;
        const emailParams = {
		    emailAddress: readyPayment.billingAddress.emailAddress,
		    orderID: `ORDER:${orderID.data}`,
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
			await buildUserEmail(data);
		}	
    }


    const handleGender = (event, id) => {
        setProductGender({...productGender, [id]: event.target.value})
    }
    const handleSize = (event, id) => {
        setProductSize({...productSize, [id]: event.target.value})
    }

    const handleIncrementQty = (event, id, productPrice) => {

        setAddButtonDisable({...addButtonDisable, [id]: false})
        setProductQuantity({...productQuantity, [id]: productQuantity[id]+1})
        const newPrice = price + productPrice;
        setPrice(newPrice);
    }
    const handleDecrementQty = (event, id, productPrice) => {
        if (addButtonDisable[id] > 0) setAddButtonDisable({...addButtonDisable, [id]: false});
        setProductQuantity({...productQuantity, [id]: productQuantity[id]-1})
        const newPrice = price - productPrice;

        setPrice(newPrice);
    }

    const handleOnClick = (event, id) => {
        // Calculate total price
        setAddButtonDisable({...addButtonDisable, [id]: true})
        // const defaultPrice = products.filter(p => p.id === id)[0].price;
        // console.log("productQuantity[id] = ", productQuantity[id])
        // const totalPrice = defaultPrice * productQuantity[id];
        // console.log("totalPrice = ", totalPrice)
        // setProductTotalQuantity({...productTotalQuantity, [id]: productTotalQuantity[id]+productQuantity[id]})
        // setPrice(price+totalPrice);
    };

    const handleReset = () => {
        setPrice(0);
        resetProducts(products);
    }

    return <>
			{readyPayment ? <SetupPayment
				id={id}
				price={price}
				emailAddress={readyPayment.billingAddress.emailAddress}
				onPaymentDone={handlePaymentDone}
			/>
			:
        <RootStyle>
            <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Container>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1} sx={{mb: 6}}>
                            {products && products.map((product) => (
                                <Card key={product.id}
                                    sx={{
                                        p: 3,
                                        boxShadow: (theme) => ({
                                            xs: theme.customShadows.card,
                                            md: `-40px 40px 80px 0px ${alpha(
                                                theme.palette.common.black,
                                                0.18
                                            )}`,
                                        }),
                                        backgroundColor: (theme) => alpha(theme.palette.grey[100]),
                                        border: 'solid darkgrey',
                                        borderWidth: 'thin',
                                        // margin: 2,
                                        display: 'flex',
                                        // position: 'relative',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'column',
                                        variant: 'outlined',                                  
                                    }}
                                >                                            
                                    {/* <Stack spacing={4} direction='row' sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}> */}
                                        <Grid container>
                                            <Grid item xs={12} md={3} >
                                                <Stack spacing={4} direction={lgUp ? 'row' : 'column'} alignItems='center' >
                                                    {lgUp && <Box sx={{ width: 40, height: 40, m: 1 }}>
                                                        <Image src={product.image} />
                                                    </Box>}
                                                                                
                                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                        {product.id}
                                                    </Typography>

                                                </Stack>

                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <Stack spacing={2} direction={lgUp ? 'row' : 'column'} sx={{mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <FormControl size="small" hiddenLabel sx={{ width: 140 }}>
                                                        <Select
                                                            value={productGender[product.id]}
                                                            onChange={e => handleGender(e, product.id)}
                                                            sx={{fontSize: '0.8rem'}}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: { px: 1 },
                                                                },
                                                            }}
                                                        >
                                                        {GENDER_OPTIONS.map((option) => (
                                                            <MenuItem sx={{fontSize: '0.8rem'}} key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
                                                        <Select
                                                            value={productSize[product.id]}
                                                            onChange={e => handleSize(e, product.id)}
                                                            sx={{fontSize: '0.8rem'}}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: { px: 1},
                                                                },
                                                            }}
                                                        >
                                                        {SIZE_OPTIONS.map((option) => (
                                                            <MenuItem sx={{fontSize: '0.8rem'}} key={option} value={option}>
                                                            {option}
                                                            </MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                    <Stack direction={lgUp ? 'row' : 'column'}justifyContent="flex-start" sx={{ mt: 3 }}>
                                                        <Typography variant="body2" sx={{ mt: 0.5, mr: 1 }}>
                                                            Quantity
                                                        </Typography>

                                                        <div>
                                                            <Incrementer
                                                                quantity={productQuantity[product.id]}
                                                                onIncrementQuantity={e=>handleIncrementQty(e, product.id, product.price)}
                                                                onDecrementQuantity={e=>handleDecrementQty(e, product.id, product.price)}
                                                            />
                                                        </div>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Stack spacing={2} direction={lgUp ? 'row' : 'column'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                                        {product.price === 0 ?
                                                            <Typography variant="body1" sx={{ mx: 1 }}>Free</Typography>
                                                            : 
                                                                <Typography variant="body1">
                                                                    {fCurrency(product.price.toLocaleString('en-US'))}
                                                                </Typography>
                                                        }
                                                    </Box>
                                                    {/* <Button
                                                        size="small" 
                                                        variant="contained" 
                                                        onClick={e => handleOnClick(e, product.id)} 
                                                        sx={{color:"common.white", backgroundColor: 'primary.main'}}
                                                        disabled={addButtonDisable[product.id] || productQuantity[product.id] == 0}
                                                    >                                                   
                                                            Add
                                                    </Button> */}
                                                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        Qty: {productTotalQuantity[product.id]}
                                                    </Typography> */}
                                                </Stack>
                                            </Grid>
                                        </Grid>                         
                                    {/* </Stack> */}

                                </Card>
                            ))}
                        {/* </Box> */}
                    </Stack>
                        {/* </Grid>
                        <Grid item xs={12} md={3} sx={{ pl: 4, mt: 4 }}> */}
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={12} md={8}>
                             <StepLabel title="I am a ..." step="1" />
                                <RHFSelect
                                    name="role"
                                    // label="Role"
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    sx={{
                                        maxWidth: 400,
                                    }}
                                >
                                    {ROLES.map((option) => (
                                        <option key={option.name} value={option.name}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>

                                <Divider sx={{ my: 5, borderStyle: 'dashed' }} />
                                <StepLabel title="Billing Information" step="2" />
                                <BillingForm/>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{mt: 7}}>
                                    {products && <Stack
                                        spacing={3}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Typography variant="subtitle2"> Order Summary </Typography>

                                        <Stack spacing={2}>
                                            <Row label="Subtotal" value={fCurrency(price)} />
                                            {/* <Row label="Tax" value={fPercent(0)} /> */}
                                        </Stack>

                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <Row
                                            label="Total"
                                            value={fCurrency(price)}
                                            sx={{
                                                typography: 'h6',
                                                '& span': { typography: 'h6' },
                                            }}
                                        />
                                        <Stack direction='row' spacing={4} justifyContent="space-between">
                                            <Button variant='contained' color='secondary' size="small" onClick={handleReset}>Clear</Button> 
                                            <LoadingButton size="large" variant="contained" type="submit" loading={isLoading}>
                                                Proceed to Payment
                                            </LoadingButton>

                                        </Stack>
                                    </Stack>
                                }
                               
                            </Grid>
                        </Grid>                  
                </FormProvider>
            </Container>
        </RootStyle>
    }
    </>
}

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'subtitle2', ...sx }}
            {...other}
        >
            <Box component="span" sx={{ typography: 'body2' }}>
                {label}
            </Box>
            {value}
        </Stack>
    );
}

Row.propTypes = {
    label: PropTypes.string,
    sx: PropTypes.object,
    value: PropTypes.string,
};