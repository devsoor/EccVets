import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetProduct } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductShirtNewEditForm from './product-shirt-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductShirtEdit({ id }) {
  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Product',
          },
          {
            name: 'Red Shirt',
            href: paths.dashboard.product.shirt.list,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductShirtNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}

ProductShirtEdit.propTypes = {
  id: PropTypes.string,
};
