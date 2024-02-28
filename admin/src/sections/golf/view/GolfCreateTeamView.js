// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import TeamNewEditForm from '../TeamNewEditForm';

// ----------------------------------------------------------------------

export default function GolfCreateTeamView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Golf Team"
        links={[
          {
            name: 'Golf Teams',
            href: paths.dashboard.golfteam.root,
          },
          { name: 'New team' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TeamNewEditForm />
    </Container>
  );
}
