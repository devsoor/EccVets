import { Helmet } from 'react-helmet-async';
// sections
import ShirtListView from 'src/sections/shirt/ShirtListView';

// ----------------------------------------------------------------------

export default function ShirtListPage() {
  return (
    <>
      <Helmet>
        <title>Shirts</title>
      </Helmet>

      <ShirtListView />
    </>
  );
}
