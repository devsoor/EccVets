import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.80,
    backgroundImage: 'url(/assets/overlay.svg), url(/assets/logo/eccvetslogo.png)',
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        height: 100,
        padding: 0,
        
    },
}));

const ContentStyle = styled('div')(({ theme }) => ({
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        position: 'absolute',
        top: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export function Hero(
    {
        title,
        subtitle,
        content
    }
) {
    return (
        <RootStyle>
            <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
                <ContentStyle>
                    <Typography
                        // text={title}
                        variant="h3"
                        sx={{ color: 'info.light'}}
                        variants={varFade().inRight}
                    >
                        {title}
                    </Typography>

                    {/* {subtitle && <Typography variant="h5" sx={{ mt: 4, color: 'grey.400'}}>{subtitle}</Typography>}

                    {content && <m.div variants={varFade().inRight}>
                            <Typography variant="h6" sx={{ mt: 4, color: 'grey.400'}}>
                                {content}
                            </Typography>
                        </m.div>
                    } */}
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
