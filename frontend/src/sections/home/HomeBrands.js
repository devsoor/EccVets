import { useEffect, useState } from 'react';
import Carousel from 'react-slick';
import { m } from 'framer-motion';

import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack, Backdrop, CircularProgress } from '@mui/material';
// components
import SvgColor from 'src/components/SvgColor';
// import Image from 'src/components/Image';
import { HOME_BRANDS } from '../../assets/brands/index';
import { MotionViewport, varFade } from 'src/components/animate';
import axios from 'src/utils/axios';
import { getSponsorLogos } from 'src/libs/api';

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(6),
    },
}));
// ----------------------------------------------------------------------

export default function HomeBrands() {
    const theme = useTheme();
    const [logos, setLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const carouselSettings = {
        speed: 5000,
        arrows: false,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        cssEase: 'linear',
        autoplaySpeed: 5000,
        rtl: Boolean(theme.direction === 'rtl'),
        responsive: [
            {
                breakpoint: theme.breakpoints.values.md,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: { slidesToShow: 2 },
            },
        ],
    };

    // const getBlobFromUrl = (myImageUrl) => {
    //     return new Promise((resolve, reject) => {
    //         let request = new XMLHttpRequest();
    //         request.open('GET', myImageUrl, true);
    //         request.responseType = 'blob';
    //         request.onload = () => {
    //             resolve(request.response);
    //         };
    //         request.onerror = reject;
    //         request.send();
    //     })
    // }
    
    // const getDataFromBlob = (myBlob) => {
    //     return new Promise((resolve, reject) => {
    //         let reader = new FileReader();
    //         reader.onload = () => {
    //             resolve(reader.result);
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(myBlob);
    //     })
    // }
    
    // const convertUrlToImageData = async (myImageUrl) => {
    //     try {
    //         let myBlob = await getBlobFromUrl(myImageUrl);
    //         console.log("convertUrlToImageData: myBlob: = ",myBlob)
    //         let myImageData = await getDataFromBlob(myBlob);
    //         console.log("myImageData = ", myImageData)
    //         return myImageData;
    //     } catch (err) {
    //         console.log(err);
    //         return null;
    //     }
    // }

    // const blobToImage = (blob) => {
    //     return new Promise(resolve => {
    //       const url = URL.createObjectURL(blob)
    //       let img = new Image()
    //       console.log("img = ", img)
    //       img.onload = () => {
    //         URL.revokeObjectURL(url)
    //         resolve(img)
    //       }
    //       img.src = url
    //     })
    //   }

    // const fetchLogos = async () => {
    //     setIsLoading(true);
    //     const response = await getSponsorLogos();
    //     console.log("fetchLogos: response = ", response);
    //     let logoList = [];
    //     for (let item of response) {
    //         let res = await fetch(item);
    //         console.log("res = ", res)
    //         let imageBlob = await res.blob();
    //         console.log("imageBlob = ", imageBlob)
    //         let imageObjectURL = URL.createObjectURL(imageBlob);
    //         console.log("imageObjectURL = ", imageObjectURL)
    //         logoList.push(imageObjectURL)
    //     }
    //     // for (let item of response) {
    //     //     let res = await fetch(item);
    //     //     console.log("res = ", res)
    //     //     let logoFile = await convertUrlToImageData(item.url);
    //     //     console.log("logoFile = ", logoFile)
    //     //     logoList.push(logoFile);
    //     // }
    //     setLogos(logoList);
    //     setIsLoading(false);
    // }
    
    // useEffect(() => {
    //     fetchLogos();
    // }, []);

    return (
        <RootStyle>
            <Container
                component={MotionViewport}
                sx={{
                    pt: { xs: 5, md: 10 },
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    <m.div variants={varFade().inUp}>
                        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                            Our Sponsors
                        </Typography>
                    </m.div>
                </Box>
                <Carousel {...carouselSettings}>
                    {HOME_BRANDS.map((brand, index) => (
                        <div key={index}>
                            <SvgColor
                                src={brand.image}
                                sx={{ width: 160, height: 80, color: 'grey.800', opacity: 0.8}}
                            />
                            {/* <Typography variant="caption">         
                            {brand.title}
                        </Typography> */}
                        </div>
                    ))}
                </Carousel>
            </Container>
        </RootStyle>
    );
}
