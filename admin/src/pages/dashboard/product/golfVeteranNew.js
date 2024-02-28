import { Helmet } from 'react-helmet-async';
// sections
import { ProductGolfVeteranCreate } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreateGolfVeteran() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new golf sponsorship product</title>
      </Helmet>

      <ProductGolfVeteranCreate />
    </>
  );
}
