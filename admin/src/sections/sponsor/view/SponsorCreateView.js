// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import SponsorNewEditForm from '../SponsorNewEditForm';

// ----------------------------------------------------------------------

export default function SponsorCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new sponsor"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Sponsor',
            href: paths.dashboard.sponsor.root,
          },
          { name: 'New sponsor' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SponsorNewEditForm />
    </Container>
  );
}
