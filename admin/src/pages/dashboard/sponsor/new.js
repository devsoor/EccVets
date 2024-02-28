import { Helmet } from 'react-helmet-async';
// sections
import { SponsorCreateView } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function SponsorCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new sponsor</title>
      </Helmet>

      <SponsorCreateView />
    </>
  );
}
