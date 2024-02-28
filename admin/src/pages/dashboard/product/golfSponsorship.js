import { Helmet } from 'react-helmet-async';
// sections
import { ProductSponsorshipView } from 'src/sections/product/view';

export default function ProductGolfSponsorship () {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Golf Sponsorship</title>
      </Helmet>

      <ProductSponsorshipView />
    </>  
  )
}
