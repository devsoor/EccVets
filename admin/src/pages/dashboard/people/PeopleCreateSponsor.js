import { Helmet } from 'react-helmet-async';
// sections
import { PeopleCreateSponsorView } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function PeopleCreateSponsor() {
  return (
    <>
      <Helmet>
        <title>New Sponsor</title>
      </Helmet>

      <PeopleCreateSponsorView/>
    </>
  );
}
