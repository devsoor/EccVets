// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductVeteranNewEditForm from './product-veteran-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductGolfVeteranCreate() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new golf veteran player product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product',
          },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductVeteranNewEditForm />
    </Container>
  );
}
