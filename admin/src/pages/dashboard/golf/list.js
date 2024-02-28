import { Helmet } from 'react-helmet-async';
// sections
import { GolfListView } from 'src/sections/golf/view';

// ----------------------------------------------------------------------

export default function GolfListPage() {
  return (
    <>
      <Helmet>
        <title>Golf</title>
      </Helmet>

      <GolfListView/>
    </>
  );
}
