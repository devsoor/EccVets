import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { SponsorEditView } from 'src/sections/people/view';

// ----------------------------------------------------------------------

export default function SponsorEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Sponsor Edit</title>
      </Helmet>

      <SponsorEditView id={`${id}`} />
    </>
  );
}
