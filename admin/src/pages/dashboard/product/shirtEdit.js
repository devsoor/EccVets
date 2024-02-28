import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductShirtEdit } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEdtShirt() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit Shirt</title>
      </Helmet>

      <ProductShirtEdit id={`${id}`} />
    </>
  );
}
