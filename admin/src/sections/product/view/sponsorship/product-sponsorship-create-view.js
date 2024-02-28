// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductSponsorshipNewEditForm from './product-sponsorship-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductGolfSponsorshipCreate() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new golf sponsorship product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product',
          },
          {
            name: 'Golf Sponsorship',
            href: paths.dashboard.product.sponsorship.list,
          },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductSponsorshipNewEditForm />
    </Container>
  );
}
