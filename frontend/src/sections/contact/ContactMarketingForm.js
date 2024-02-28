import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { sendContactFormEmail } from 'src/libs/api';

// ----------------------------------------------------------------------

const SERVICES = ['Email marketing', 'SEO', ' Social Marketing', 'Research'];

// ----------------------------------------------------------------------

export default function ContactMarketingForm() {
    const MarketingContactSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().required('Email is required').email('That is not an email'),
        phoneNumber: Yup.string().required('Phone number is required'),
    });

    const defaultValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
    };

    const methods = useForm({
        resolver: yupResolver(MarketingContactSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async data => {
        try {
            const params = {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                message: data.message,
            }
            await sendContactFormEmail(params);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5} alignItems="flex-start">
                <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
                    <RHFTextField name="fullName" label="Full Name" />
                </Stack>

                <RHFTextField name="email" label="Email" />
                <RHFTextField name="phoneNumber" label="Phone number" />

                {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2.5, md: 2 }} sx={{ width: 1 }}>
                    <RHFTextField name="company" label="Compnany" />

                    <RHFTextField name="website" label="Website" />
                </Stack> */}

                {/* <Stack spacing={5} sx={{ py: 2, width: 1 }}>
                    <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                        Your Donation
                    </Typography>

                    <RHFSlider
                        name="budget"
                        valueLabelDisplay="on"
                        max={50000}
                        step={100}
                        valueLabelFormat={value => fCurrency(value)}
                    />
                </Stack> */}

                <RHFTextField name="message" label="Message" multiline rows={4} />
            </Stack>

            <LoadingButton
                size="large"
                // color="inherit"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ mt: 3 }}
            >
                Send Message
            </LoadingButton>
        </FormProvider>
    );
}
