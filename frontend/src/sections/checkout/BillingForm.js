// @mui
import { Stack, Box } from '@mui/material';
// components
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { states } from 'src/data/_states';

// ----------------------------------------------------------------------

export default function BillingForm() {
    
    return (
        <Stack spacing={5}>
            <div>

                <Box
                    rowGap={2.5}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                >
                    <RHFTextField name="billingAddress.fullName" label="Full Name" />

                    <RHFTextField name="billingAddress.emailAddress" label="Email Address" />

                    <RHFTextField name="billingAddress.phoneNumber" label="Phone Number" />
                    <RHFTextField name="billingAddress.streetAddress" label="Street address" />
                    <RHFTextField name="billingAddress.city" label="City" />
                    <RHFTextField name="billingAddress.zipCode" label="ZIP Code" />

                    <RHFSelect name="billingAddress.state" label="State" placeholder="State">
                        {states.map(option => (
                            <option key={option.name} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </RHFSelect>

                </Box>
            </div>
        </Stack>
    );
}
