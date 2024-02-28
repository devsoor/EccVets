import { Helmet } from 'react-helmet-async';
// sections
import { ProductCommunityView } from 'src/sections/product/view';

export default function ProductGolfCommunity () {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Golf Veteran Player</title>
      </Helmet>

      <ProductCommunityView />
    </>  
  )
}
