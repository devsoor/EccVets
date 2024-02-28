import { Helmet } from 'react-helmet-async';
// sections
import { ProductGolfSponsorshipCreate } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new golf sponsorship product</title>
      </Helmet>

      <ProductGolfSponsorshipCreate />
    </>
  );
}
