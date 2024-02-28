// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductShirtNewEditForm from './product-shirt-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductShirtCreate() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new red shirt"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product',
          },
          {
            name: 'Red Shirt',
            href: paths.dashboard.product.shirt.list,
          },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductShirtNewEditForm />
    </Container>
  );
}
