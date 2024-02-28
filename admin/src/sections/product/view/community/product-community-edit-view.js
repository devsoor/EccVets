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
import ProductCommunityNewEditForm from './product-community-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductGolfCommunityEdit({ id }) {
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
            name: 'Golf Community Players',
            href: paths.dashboard.product.community.list,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductCommunityNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}

ProductGolfCommunityEdit.propTypes = {
  id: PropTypes.string,
};
