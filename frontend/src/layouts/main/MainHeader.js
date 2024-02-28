import { useLocation, Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Box, Button, AppBar, Toolbar, Container, Typography } from '@mui/material';

// components
import Logo from '../../components/Logo';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';

//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import menuConfig from './MenuConfig';

import { PATH_PAGE, PATH_AUTH } from '../../routes/paths';


// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: HEADER.MOBILE_HEIGHT,
    transition: theme.transitions.create(['height', 'background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('md')]: {
        height: HEADER.MAIN_DESKTOP_HEIGHT,
    },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    zIndex: -1,
    // margin: 'auto',
    borderRadius: '50%',
    position: 'absolute',
    width: `calc(100% - 48px)`,
    boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
    const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

    const theme = useTheme();

    const { pathname } = useLocation();

    const isDesktop = useResponsive('up', 'md');

    const isHome = pathname === '/';

    return (
        <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
            <ToolbarStyle
                disableGutters
                sx={{
                    ...(isOffset && {
                        ...cssStyles(theme).bgBlur(),
                        height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
                    }),
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Logo sx={{width: 100}}/>

                    <Box sx={{ flexGrow: 1 }} />

                    {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={menuConfig} />}
                    {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={menuConfig} />}
                    
                    {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }}>
                        <Button
                            component={RouterLink}
                            variant="contained"
                            rel="noopener"
                            sx={{
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter',
                                },
                            }}                            
                                to={PATH_PAGE.donate}
                        >
                            Donate
                        </Button>

                    </Stack> */}
                </Container>
            </ToolbarStyle>

            {isOffset && <ToolbarShadowStyle />}
        </AppBar>
    );
}
