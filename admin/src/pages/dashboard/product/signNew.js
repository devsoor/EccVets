import { Helmet } from 'react-helmet-async';
// sections
import { ProductSignCreate } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreateSign() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new veteran sign product</title>
      </Helmet>

      <ProductSignCreate />
    </>
  );
}
