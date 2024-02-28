// @mui
import { Typography, Stack, Link } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

export default function ContactMarketingInfo() {
    const isMdUp = useResponsive('up', 'md');

    return (
        <Stack spacing={3}>
            {isMdUp && (
                <Image
                    alt="marketing contact"
                    src="/assets/illustrations/illustration_marketing_contact.svg"
                    sx={{ maxWidth: 380 }}
                />
            )}

            <Stack spacing={2} direction="row" alignItems="flex-start">
                <Iconify icon="carbon:location" width={28} />

                <Stack spacing={0.5}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Typography variant="h6">Visit us</Typography>

                        <Link sx={{ lineHeight: 0 }} target='_blank' href="https://www.sheahomes.com/new-homes/arizona/phoenix-area/queen-creek/encanterra-a-trilogy-resort-community/">
                            <Iconify icon="carbon:launch" width={18} />
                        </Link>
                    </Stack>

                    <Typography variant="body2">Encanterra Country Club, Queen Creek AZ</Typography>
                </Stack>
            </Stack>

            {/* <Stack spacing={2} alignItems="flex-start" direction="row">
                <Iconify width={28} icon="carbon:email" />
                <Stack spacing={0.5}>
                    <Typography variant="h6">Talk to us</Typography>
                    <Link color="inherit" variant="body2" href="mailto:hello@example.com">
                        (805) 235-0615
                    </Link>
                </Stack>
            </Stack> */}

            <Stack spacing={2} alignItems="flex-start" direction="row">
                <Iconify width={28} icon="carbon:email" />
                <Stack spacing={0.5}>
                    <Typography variant="h6">Email us</Typography>
                    <Link color="inherit" variant="body2" href={process.env.REACT_APP_INFO_EMAIL}>
                        {process.env.REACT_APP_INFO_EMAIL}
                    </Link>
                </Stack>
            </Stack>

            {/* <Stack spacing={2} alignItems="flex-start" direction="row">
                <Iconify width={28} icon="carbon:time" />
                <Stack spacing={0.5}>
                    <Typography variant="h6">Working Hours</Typography>
                    <Typography variant="body2">Mon-Fri: 9 am — 6 pm</Typography>
                </Stack>
            </Stack> */}
        </Stack>
    );
}
