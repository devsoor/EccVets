import { Helmet } from 'react-helmet-async';
// sections
import { ProductShirtCreate } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreateShirt() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new red shirt product</title>
      </Helmet>

      <ProductShirtCreate />
    </>
  );
}
