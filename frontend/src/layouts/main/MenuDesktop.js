import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Grid, List, Stack, Popover, ListItem, ListSubheader, CardActionArea } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary.main,
    marginRight: theme.spacing(5),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
        opacity: 0.48,
        textDecoration: 'none',
    },
}));

const SubLinkStyle = styled(props => (
    <ListItem sx={{ p: 0 }}>
        <Link rel="noopener" {...props}>
            {props.children}
        </Link>
    </ListItem>
))(({ theme }) => ({
    ...theme.typography.body2,
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
    '&:hover': {
        color: theme.palette.text.primary,
    },
}));

// ----------------------------------------------------------------------

MenuDesktop.propTypes = {
    isHome: PropTypes.bool,
    isOffset: PropTypes.bool,
    navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
    const { pathname } = useLocation();

    const [open, setOpen] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState();
    const isActive = path => pathname === path;

    useEffect(() => {
        if (open) {
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleOpen = (event, item) => {
        if (item.children) {
            setSelectedChildren(item.children);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack direction="row" spacing={2}>
            {navConfig.map(item => (
                <div key={item.title}>
                    {item.children ? (
                        <LinkStyle
                            onClick={e => handleOpen(e, item)}
                            // onMouseEnter={e=>handleOpen(item)}
                            // onMouseLeave={handleClose}
                            sx={{
                                display: 'flex',
                                cursor: 'pointer',
                                alignItems: 'center',
                                ...(isHome && { color: 'primary.main' }),
                                ...(isOffset && { color: 'primary.main' }),
                                ...(open && { opacity: 0.48 }),
                            }}
                        >
                            {item.title}
                            <Iconify
                                icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                                sx={{ ml: 0.5, width: 16, height: 16 }}
                            />
                        </LinkStyle>
                    ) : (
                        <LinkStyle
                            to={item.path}
                            component={RouterLink}
                            end={item.path === '/'}
                            sx={{
                                ...(isHome && { color: 'primary.main' }),
                                ...(isOffset && { color: 'primary.main' }),
                                '&.active': {
                                    color: 'secondary.main',
                                },
                            }}
                        >
                            {item.title}
                        </LinkStyle>
                    )}
                    {open && (
                        <Popover
                            open={open}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 200, left: 200 }}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    px: 3,
                                    pb: 3,
                                    right: 10,
                                    m: 'auto',
                                    borderRadius: 2,
                                    maxWidth: 360,
                                    // boxShadow: (theme) => theme.customShadows.z24,
                                },
                            }}
                        >
                            <Grid container>
                                {selectedChildren.map((list, index) => {
                                    const { items } = list;

                                    return (
                                        //  <Grid key={index} item xs={12} md={6}>
                                        <List disablePadding key={index}>
                                            {items.map(item => (
                                                <SubLinkStyle
                                                    key={item.title}
                                                    href={item.path}
                                                    sx={{
                                                        ...(isActive(item.path) && {
                                                            color: 'text.primary',
                                                            typography: 'subtitle2',
                                                        }),
                                                    }}
                                                >
                                                    <>
                                                        {/* <IconBullet /> */}
                                                        {item.title}
                                                    </>
                                                </SubLinkStyle>
                                            ))}
                                        </List>
                                        //  </Grid>
                                    );
                                })}
                            </Grid>
                        </Popover>
                    )}
                </div>
            ))}
        </Stack>
    );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

IconBullet.propTypes = {
    type: PropTypes.oneOf(['item', 'subheader']),
};

function IconBullet({ type = 'item' }) {
    return (
        <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
            <Box
                component="span"
                sx={{
                    ml: '2px',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                    ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
                }}
            />
        </Box>
    );
}
