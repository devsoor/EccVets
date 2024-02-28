import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { EventsHero, EventsContent} from '../sections/events';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function EventList () {
    return (
        <Page title="Events ">
            <RootStyle>
                <EventsHero />
                <EventsContent/>
            </RootStyle>
        </Page>  
    )
}
