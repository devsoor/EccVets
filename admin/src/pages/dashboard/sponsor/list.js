import { Helmet } from 'react-helmet-async';
// sections
import { PeopleListViewSponsor } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function PeopleListPage() {
  return (
    <>
      <Helmet>
        <title>Sponsors</title>
      </Helmet>

      <PeopleListViewSponsor />
    </>
  );
}
