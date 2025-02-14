import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';
// components
import Image from 'src/components/Image';
import { MotionContainer, varFade } from 'src/components/animate';
import { CarouselDots, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.01),
}));

// ----------------------------------------------------------------------

AppFeatured.propTypes = {
    list: PropTypes.array.isRequired,
};

export default function AppFeatured({ list, ...other }) {
    const theme = useTheme();

    const carouselRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        speed: 400,
        dots: true,
        arrows: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentIndex(next),
        ...CarouselDots({
            zIndex: 9,
            top: 24,
            left: 24,
            position: 'absolute',
        }),
    };

    const handlePrevious = () => {
        carouselRef.current?.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current?.slickNext();
    };

    return (
        <Card {...other} sx={{width: 350, height: 300}}>
            <Slider ref={carouselRef} {...settings}>
                {list.map((app, index) => (
                    <CarouselItem key={index} item={app} isActive={index === currentIndex} />
                ))}
            </Slider>

            <CarouselArrows
                onNext={handleNext}
                onPrevious={handlePrevious}
                spacing={0}
                sx={{
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    '& .arrow': {
                        p: 0,
                        width: 32,
                        height: 32,
                        opacity: 0.48,
                        color: 'common.white',
                        '&:hover': { color: 'common.white', opacity: 1 },
                    },
                }}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
    isActive: PropTypes.bool,
    item: PropTypes.shape({
        description: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
    }),
};

function CarouselItem({ item, isActive }) {
    const { image, title } = item;

    return (
        <Box sx={{ position: 'relative' }}>
            <CardContent
                component={MotionContainer}
                animate={isActive}
                action
                sx={{
                    bottom: 0,
                    width: 1,
                    zIndex: 2,
                    textAlign: 'left',
                    position: 'absolute',
                    color: 'common.white',
                }}
            >
                <m.div variants={varFade().inRight}>
                    <Link color="inherit" underline="none">
                        <Typography variant="h5" gutterBottom noWrap>
                            {title}
                        </Typography>
                    </Link>
                </m.div>
            </CardContent>

            <OverlayStyle />

            <Image alt={title} src={image} />
        </Box>
    );
}
