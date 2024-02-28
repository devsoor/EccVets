// @mui
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
// sections
import { HomeHero, HomeBrands, HomeEvents, HomeCharity } from '../sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
    return (
        <Page title="Veterans Club at Encanterra">
            <HomeHero />

            <ContentStyle>
                <HomeBrands />

                {/* <HomeGallery /> */}
                <HomeEvents />

                <HomeCharity />

            </ContentStyle>
        </Page>
    );
}
