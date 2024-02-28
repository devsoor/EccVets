import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import { PlayerRegistrationHero, PlayerRegistrationPricing } from '../sections/golf';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

export default function GolfVeteranPlayerRegistration () {
    const { id } = useParams();
    return (
        <Page title="Veteran Registration">
            <RootStyle>
                <PlayerRegistrationHero />
                <PlayerRegistrationPricing type="Veteran" eventID={id}/>
            </RootStyle>
        </Page>
    );
};