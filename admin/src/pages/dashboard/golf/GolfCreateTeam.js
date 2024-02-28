import { Helmet } from 'react-helmet-async';
// sections
import { GolfCreateTeamView } from 'src/sections/golf/view';

// ----------------------------------------------------------------------

export default function GolfCreateTeam() {
  return (
    <>
      <Helmet>
        <title>New Team</title>
      </Helmet>

      <GolfCreateTeamView/>
    </>
  );
}
