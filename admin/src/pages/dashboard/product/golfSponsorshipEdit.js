import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductGolfSponsorshipEdit } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEditGolfSponsorship() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit Golf Sponsorship</title>
      </Helmet>

      <ProductGolfSponsorshipEdit id={`${id}`} />
    </>
  );
}
