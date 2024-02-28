import { Helmet } from 'react-helmet-async';
// sections
import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

export default function NonSponsorAccountPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Account Settings</title>
      </Helmet>

      <AccountView />
    </>
  );
}
