// @mui
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// @mui
import { Stack, Container, Typography, Box } from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------
const TIMELINES = [
    {
        year: '2022',
        title: 'Charity',
        description:
            'Annual charity Golf Event at the Encanterra Golf Club results in donations of over $90,000 to local charities including Veterans First LTD, Honor Flight and HOHP of Pinal County (Honoring,Hiring/Helping Our Heroes of Pinal County).',
    },
    {
        year: '2021',
        title: 'Success',
        description:
            'Despite all the issues of 2021 and 2022, our sixth year of fulfilling the wishes of over 170 veterans and spouses was a success. We received Media Coverage from both ABC15 and Fox News 10 (can be viewed on YouTube).',
    },
    {
        year: '2018',
        title: 'Golf Tournament',
        description:
            'The Club reaches a significant milestone as we initiated our annual Charity Golf Tournament.  This is the club’s marquee fund raising event. ',
    },
    {
        year: '2017',
        title: 'Gift Programs',
        description:
            'The Club began a program to support the Arizona State Veteran Home through the annual "Adopt-A-Vet for Christmas" gift program.  To date, our Encanterra community has helped us provide gifts for more than 700 residents. Our gift giving days have been covered by local media.',
    },
    {
        year: '2016',
        title: 'Organization',
        description:
            'The Club formalizes its charitable activities by becoming a 501(c)(3) non-profit organization and was also approved as a non-profit corporation by the Arizona Corporation Commission.',
    },
    {
        year: '2015',
        title: 'Growth',
        description:
            'Club grows to 70 members and donates over $11,500 for the renovation of a recreation room at the Arizona State Veterans Home in Phoenix.',
    },
    {
        year: '2010',
        title: 'Origination',
        description:
            'A few residents of our newly created community gathered for the first meeting to establish an organization for veterans. The founding members committed to assisting local veterans in need.',
    },
];

const COLORS = ['info', 'secondary', 'primary', 'success', 'warning'];

// ----------------------------------------------------------------------

export default function AboutHistory() {
    const isMdUp = useResponsive('up', 'md');

    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                textAlign: 'center',
            }}
        >
            <Container
                sx={{
                    pt: { xs: 5, md: 10 },
                }}
            >
                <Stack spacing={4} sx={{mb: 2}}>

                    <Typography variant="subitite1" sx={{fontWeight: 'bold', textAlign: 'justify'}}>
                        In 2023, the Charity Golf Tournament resulted in donations of over $100,000 to local veteran organizations.
                        To date we have been able to donate over $330,000 to various organizations, improving the lives of Arizona 
                        veterans and their families. We hope to raise even more funds for these groups in 2024!
                    </Typography>
                    <Typography variant="h3">Our History</Typography>
                    <Timeline position={isMdUp ? 'alternate' : 'right'}>
                        {TIMELINES.map((value, index) => (
                            <TimelineItem
                                key={value.title}
                                sx={{
                                    '&:before': {
                                        ...(!isMdUp && { display: 'none' }),
                                    },
                                }}
                            >
                                <TimelineSeparator>
                                    <TimelineDot color={COLORS[index]} />
                                    <TimelineConnector />
                                </TimelineSeparator>

                                <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                                    <Typography variant="overline" sx={{ color: `${COLORS[index]}.main` }}>
                                        {value.year}
                                    </Typography>

                                    <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                                        {value.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            maxWidth: { md: 360 },
                                            ...(index % 2 && {
                                                ml: 'auto',
                                            }),
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                    <Box sx={{ m: 6 }}>
                        <Typography variant="body1" sx={{ mt: 0.5, mb: 1 }}>
                        We are an all-volunteer organization. Officers receive no salary and indirect expenses are 
                        limited to software fees, storage rental, insurance, and similar operating costs.
                        </Typography>
                        <Typography>
                        The Club remains dedicated to our founding principles of camaraderie  &nbsp;
                            <Typography variant="span" sx={{ fontWeight: 800 }}>
                                and helping our fellow veterans.
                            </Typography>
                        </Typography>
                    </Box>
                </Stack>

            </Container>
        </Box>
    );
}
