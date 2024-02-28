
import { Helmet } from 'react-helmet-async';
// sections
import { EventListView } from 'src/sections/eventlist/view';

// ----------------------------------------------------------------------

export default function EventList() {
  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>

      <EventListView />
    </>
  );
}

