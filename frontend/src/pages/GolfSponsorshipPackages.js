import React from 'react';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import { SponsorshipPackagesHero, SponsorshipPackagesPricing } from '../sections/golf';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(16),
    },
}));

// ----------------------------------------------------------------------

const GolfSponsorshipPackages = () => {
    const { id } = useParams();

    return (
        <Page title="Golf Packages">
            <RootStyle>
                <SponsorshipPackagesHero />
                <SponsorshipPackagesPricing eventID={id}/>
            </RootStyle>
        </Page>
    );
};

export default GolfSponsorshipPackages;
