import { Helmet } from 'react-helmet-async';
// sections
import { SponsorProfileView } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function SponsorProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sponsor Profile</title>
      </Helmet>

      <SponsorProfileView />
    </>
  );
}
