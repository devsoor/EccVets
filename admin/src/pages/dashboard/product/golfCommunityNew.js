import { Helmet } from 'react-helmet-async';
// sections
import { ProductGolfCommunityCreate } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreateGolfCommunity() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new golf sponsorship product</title>
      </Helmet>

      <ProductGolfCommunityCreate />
    </>
  );
}
