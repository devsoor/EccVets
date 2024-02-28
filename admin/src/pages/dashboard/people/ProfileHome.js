import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
//

// ----------------------------------------------------------------------
const Mailto = ({ email, subject, body, ...props }) => {
  return (
      <a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`} style={{ textDecoration: 'underline' }}>
          {props.children}
      </a>
  );
};
export default function ProfileHome({ info }) {
  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {info.companyName && <Box sx={{ typography: 'subtitle2', color:'success.dark' }}>{info.companyName}</Box>}
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {info.companyName ? `Office located at ` :`Lives at `}
          </Box>
        </Stack>
            <Typography variant="subtitle2" color="inherit" sx={{ml: 6}}>
              {info.streetAddress}, {info.city} {info.state} {info.zipCode}
            </Typography>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
			<Mailto email={info.emailAddress}>
					<Typography variant="subtitle2" >
						{info.emailAddress}
					</Typography>
				</Mailto>
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="material-symbols:phone-android" width={24} sx={{ mr: 2 }} />
          {info.phoneNumber}
        </Stack>
      </Stack>
    </Card>
  );


  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          {/* {renderFollows} */}

          {renderAbout}

          {/* {renderSocials} */}
        </Stack>
      </Grid>

      {/* <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {renderPostInput}

          {posts.map((post) => (
            <ProfilePostItem key={post.id} post={post} />
          ))}
        </Stack>
      </Grid> */}
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
};
