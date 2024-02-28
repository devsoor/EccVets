import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductGolfCommunityEdit } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEditGolfCommunity() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit</title>
      </Helmet>

      <ProductGolfCommunityEdit id={`${id}`} />
    </>
  );
}
