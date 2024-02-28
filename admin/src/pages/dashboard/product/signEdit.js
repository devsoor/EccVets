import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductSignEdit } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEditSign() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit Sign</title>
      </Helmet>

      <ProductSignEdit id={`${id}`} />
    </>
  );
}
