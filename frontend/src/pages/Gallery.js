import { useState, useEffect } from 'react';
// @mui
import { Box, Stack, Pagination } from '@mui/material';
import Image from 'src/components/Image';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imgs = [];
        for (let cnt = 1; cnt < 10; cnt += 1) {
            imgs.push(`../assets/gallery/img - ${cnt}.png`);
        }
        setImages(imgs);
    }, []);

    return (
        <>
            <Box
                sx={{
                    pt: 5,
                    pb: 10,
                    gap: 4,
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                }}
            >
                {images &&
                    images.map((img, index) => (
                        <Image key={index} src={img} alt="img" ratio="1/1" sx={{ borderRadius: 2 }} />
                    ))}
            </Box>
            <Pagination
                count={10}
                color="primary"
                size="large"
                sx={{
                    pb: 10,
                    '& .MuiPagination-ul': {
                        justifyContent: 'center',
                    },
                }}
            />
        </>
    );
};

export default Gallery;
