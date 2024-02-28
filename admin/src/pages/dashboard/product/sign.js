import { Helmet } from 'react-helmet-async';
// sections
import { ProductSignView } from 'src/sections/product/view';

export default function ProductSign () {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Veteran Sign</title>
      </Helmet>

      <ProductSignView />
    </> 
  )
}
