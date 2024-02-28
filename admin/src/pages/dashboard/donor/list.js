import { Helmet } from 'react-helmet-async';
// sections
import DonorListView from 'src/sections/donor/DonorListView';

// ----------------------------------------------------------------------

export default function DonorListPage() {
  return (
    <>
      <Helmet>
        <title>Donor</title>
      </Helmet>

      <DonorListView/>
    </>
  );
}
