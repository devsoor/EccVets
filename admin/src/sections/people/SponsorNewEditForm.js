import * as Yup from 'yup';
import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { fData } from 'src/utils/format-number';
// assets
import { states } from 'src/data/_states';
import { paths } from 'src/routes/paths';

// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadLogo
} from 'src/components/hook-form';
import { createSponsor } from 'src/libs/api';


// ----------------------------------------------------------------------

export default function SponsorNewEditForm({ currentUser }) {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
  	const [isLoading, setIsLoading] = useState(false);

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
	});
	const defaultValues = {
		billingAddress: {
			fullName: '',
			emailAddress: '',
			phoneNumber: '',
			streetAddress: '', 
			city: '',
			state: 'AZ',
			zipCode: '',
			companyLogo: {},
			companyName: '',
		},
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

  	const onSubmit = async data => {
		setIsLoading(true);

		const params = {
			billingAddress: data.billingAddress,
			type: 'sponsor',
		}
		const response = await createSponsor(params);
		const sponsorID = response.data;
		if (response.statusCode === 401) {
			enqueueSnackbar(response.data, {variant: 'error'});
			setIsLoading(false);
		} else if (response.statusCode === 400) {
			enqueueSnackbar('Error creating sponsor', {variant: 'error'});
			setIsLoading(false);
		} else {
			setIsLoading(false);
			enqueueSnackbar('Created sponsor successfully!');
			navigate(paths.dashboard.sponsor.root)
		}
	};
    const handleDrop = useCallback(
        (acceptedFiles) => {
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
        setValue("billingAddress.companyLogo", {})
    }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
           
            <Box sx={{ mb: 5 }}>
				<Stack direction="row" sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
					<RHFUploadLogo
						name="billingAddress.companyLogo"
						maxSize={3145728}
						onDrop={handleDrop}
						helperText={
							<Typography
								variant="caption"
								sx={{
									mt: 2,
									mx: 'auto',
									display: 'block',
									textAlign: 'center',
									color: 'text.secondary',
								}}
							>
								Allowed *.jpeg, *.jpg, *.png, *.gif
								<br /> max size of {fData(3145728)}
							</Typography>
						}
					/>
					<Tooltip>
						<IconButton onClick={handleRemove}>
							<Iconify icon="mdi:clear-box-outline"/>
						</IconButton>
					</Tooltip>
                </Stack>
            </Box>

            {/* <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            /> */}

          
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="billingAddress.fullName" label="Full Name" />

			<RHFTextField name="billingAddress.emailAddress" label="Email Address" />

			<RHFTextField name="billingAddress.phoneNumber" label="Phone Number" />
			<RHFTextField name="billingAddress.streetAddress" label="Street address" />

			<RHFTextField name="billingAddress.city" label="City" />
			<RHFTextField name="billingAddress.zipCode" label="ZIP Code" />

			<RHFSelect name="billingAddress.state" label="State" placeholder="State">
				{states.map(option => (
					<option key={option.name} value={option.name}>
						{option.name}
					</option>
				))}
			</RHFSelect>
			<RHFTextField name="billingAddress.companyName" label="Company or Sponsor Name" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
