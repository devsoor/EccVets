import { useMemo } from 'react';
import merge from 'lodash/merge';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  const defaultValues = useMemo(
    () => ({
      id: '',
      title: '',
      description: '',
      color: CALENDAR_COLOR_OPTIONS[1],
      allDay: false,
      start: selectedRange ? selectedRange.start : new Date().getTime(),
      end: selectedRange ? selectedRange.end : new Date().getTime(),
      extendedProps: {
          cutoffDate: selectedRange ? selectedRange.end : new Date().getTime(),
          active: false,
          totalAttendees: 0,
          // cutoffAttendees: 0,
          cost: 0,
          location: '',
          allowSponsor: false,
          allowVeteran: false,
          allowCommunity: false,
          comment: '',
          veteranFree: false,
          category: "Other",
      }
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  const currentEvent = events.find((event) => event.id === selectEventId);

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}
