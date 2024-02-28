import { Helmet } from 'react-helmet-async';
// sections
import SignListView from 'src/sections/sign/SignListView';

// ----------------------------------------------------------------------

export default function SignListPage() {
  return (
    <>
      <Helmet>
        <title>Signs</title>
      </Helmet>

      <SignListView />
    </>
  );
}
