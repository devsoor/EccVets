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
import ProductSponsorshipNewEditForm from './product-sponsorship-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductGolfSponsorshipEdit({ id }) {
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
            name: 'Golf Sponsorship',
            href: paths.dashboard.product.sponsorship.list,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductSponsorshipNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}

ProductGolfSponsorshipEdit.propTypes = {
  id: PropTypes.string,
};
