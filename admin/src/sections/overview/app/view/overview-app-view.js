
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';

import { getTotals, getInvoiceSummary, getEvents } from 'src/libs/api';

import {
  startOfMonth,
  formatISO,
  addMonths,
} from 'date-fns';
//
import AppWidget from '../app-widget';
import AppEvent from '../app-event';
import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const mdUp = useResponsive('up', 'md');

  const settings = useSettingsContext();

  const [sponsors, setSponsors] = useState(0);
  const [veterans, setVeterans] = useState(0);
  const [community, setCommunity] = useState(0);
  const [signs, setSigns] = useState(0);
  const [shirts, setShirts] = useState(0);
  // const [invoices, setInvoices] = useState(0);
  const [ events, setEvents] = useState(0);

  const fetchTotals = async () => {
    const response = await getTotals();
    if (response) {
      const numSponsors = response.filter(item => item.name === "sponsors")[0].value;
      setSponsors(numSponsors);
      const numVeterans = response.filter(item => item.name === "veterans")[0].value;
      setVeterans(numVeterans);
      const numCommunity = response.filter(item => item.name === "community")[0].value;
      setCommunity(numCommunity);
      const numSigns = response.filter(item => item.name === "signs")[0].value;
      setSigns(numSigns);
      const numShirts = response.filter(item => item.name === "shirts")[0].value;
      setShirts(numShirts);
      // const invoices = await getInvoiceSummary();
      // console.log("invoices = ", invoices)
      // setInvoices(invoices);
    }
  }

  const fetchEvents = async () => {
    // setIsLoading(true);
    const startDate = formatISO(startOfMonth(new Date()));
    const endDate = formatISO(addMonths(startOfMonth(new Date()), 12));
    const params = {
      startDate,
      endDate,
      limit: 10
    }
    const response = await getEvents(params);
    setEvents(response);
    // setIsLoading(false);
}

  useEffect(() => {
    fetchTotals();
    fetchEvents();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Sponsors"
            total={sponsors}
            sx={{backgroundColor: 'primary.lighter', boxShadow: 8}}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Veterans"
            total={veterans}
            sx={{backgroundColor: 'secondary.lighter', boxShadow: 8}}
          />
        </Grid>

        {/* <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Club members"
            total={0}
            sx={{backgroundColor: 'warning.lighter', boxShadow: 8}}

          />
        </Grid> */}
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Community members"
            total={community}
            sx={{backgroundColor: 'info.lighter', boxShadow: 8}}
          />
        </Grid>

        <Grid xs={12}>
          <Stack direction={mdUp ?'row':'column'} spacing={10} display='flex' justifyContent='space-around'>
            <AppWidget
              title="Total Shirts Sold"
              total={shirts}
              icon="tabler:shirt"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Total Signs Sold"
              total={signs}
              icon="la:flag-usa"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid>

        {events && <Grid xs={12}>
            <AppEvent
              title="Events"
              tableData={events}
              tableLabels={[
                { id: 'title', label: 'Title' },
                { id: 'start', label: 'Start' },
                { id: 'end', label: 'End' },
                { id: 'cost', label: 'Cost' },
                { id: 'allowSponsor', label: 'Sponsor Allowed' },
                { id: 'allowVeteran', label: 'Veteran Allowed' },
                { id: 'allowCommunity', label: 'Community Allowed' },
                { id: 'category', label: 'Category' },
              ]}
            />
          </Grid>
        }

      </Grid>
    </Container>
  );
}
