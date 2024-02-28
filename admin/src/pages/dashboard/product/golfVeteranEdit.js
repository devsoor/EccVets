import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductGolfVeteranEdit } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEditGolfVeteran() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit Golf Veteran Players</title>
      </Helmet>

      <ProductGolfVeteranEdit id={`${id}`} />
    </>
  );
}
