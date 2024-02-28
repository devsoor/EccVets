import { m } from 'framer-motion';

// @mui
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
// components
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.neutral,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}));
// ----------------------------------------------------------------------

const members = [
    'Jerry Kolesiak  – President',
    'Wayne Johnson - Vice President',
    'David Anon - Treasurer',
    'Jeff Robinson - Secretary',
    'Tom Corridan',
    'Joe Knott',
    'Carlos Vargas',
    'Catherine Cobet',
    'John Hottinger',
    'Terris Kennedy',
    'Kevin Rooney',
];
// ----------------------------------------------------------------------

export default function AboutTeam() {
    return (
        <RootStyle>
            <Container component={MotionViewport} sx={{ pb: 2, textAlign: 'center' }}>
                <m.div variants={varFade().inUp}>
                    <Typography variant="h2" sx={{ mb: 3 }}>
                        Board of Directors
                    </Typography>
                </m.div>

                <Box
                    sx={{
                        display: 'grid',
                        textAlign: 'center',
                        rowGap: 3,
                        columnGap: 2,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                >
                    {members.map((member, indx) => (
                        <Typography key={indx} variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
                            {member}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </RootStyle>
    );
}
