import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { EventDetailHero, EventDetailContent } from 'src/sections/events';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function EventDetail () {
    const params = useParams();
    const { id } = params;

    return (
        <Page title="Event Information">
            <RootStyle>
                <EventDetailHero/>
                <EventDetailContent id={`${id}`}/>
            </RootStyle>
        </Page>  
    )
}
