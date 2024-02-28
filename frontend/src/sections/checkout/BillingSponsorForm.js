import React, { useCallback } from 'react';

// @mui
import {
    Box,
    Stack,
    Tooltip,
    Typography,
    IconButton,
} from '@mui/material';

// components
import { RHFTextField, RHFSelect, RHFUploadLogo } from '../../components/hook-form';
import { states } from 'src/data/_states';
import { fData } from 'src/utils/formatNumber';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function BillingSponsorForm({ onDropLogo, onRemoveLogo }) {
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
                    <RHFTextField name="billingAddress.companyName" label="Company or Sponsor Name" />
                    <Stack direction="row" sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
                        <RHFUploadLogo
                            name="billingAddress.companyLogo"
                            maxSize={3145728}
                            onDrop={onDropLogo}
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
                                <IconButton onClick={onRemoveLogo}>
                                    <Iconify icon="mdi:clear-box-outline"/>
                                </IconButton>
                            </Tooltip>
                    </Stack>

                </Box>
            </div>
        </Stack>
    );
}
