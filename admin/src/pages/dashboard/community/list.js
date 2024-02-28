import { Helmet } from 'react-helmet-async';
// sections
import { PeopleListView } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function PeopleListPage() {
  return (
    <>
      <Helmet>
        <title>Peoples</title>
      </Helmet>

      <PeopleListView id="community" />
    </>
  );
}
