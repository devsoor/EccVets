import { Helmet } from 'react-helmet-async';
// sections
import { ProductVeteranView } from 'src/sections/product/view';

export default function ProductGolfVeteran () {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Golf Veteran Player</title>
      </Helmet>

      <ProductVeteranView />
    </>  
  )
}
