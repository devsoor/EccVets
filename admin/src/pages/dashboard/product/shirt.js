import { Helmet } from 'react-helmet-async';
// sections
import { ProductShirtView } from 'src/sections/product/view';

export default function ProductShirt () {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Red Shirt</title>
      </Helmet>

      <ProductShirtView />
    </> 
  )
}
