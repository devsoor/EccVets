import { Hero } from 'src/sections/common/Hero';


// ----------------------------------------------------------------------

export default function GolfHero() {
    const title = "2023&nbsp;Golf&nbsp;Tournament&nbsp;&&nbsp;The&nbsp;Challenge";
    const content = `Encanterra County Club boasts a Tom Lehmann designed championship golf course with panoramic
    views of both the Superstition and San Tan Mountains. At 7,176 yards, this stunning course
    provides challenges for golfers of all levels and abilities. Named among the Top Ten New
    Courses in 2008, Encanterra has hosted some of the Valley's premier golf events, including
    The Gateway Tour Championship, The LGAA Thunderbirds Classic and sectional qualifying rounds
    for both the US Open and US Senior Open.`

    return <Hero title={title} content={content}/>
    // return (
    //     <RootStyle>
    //         <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
    //             <ContentStyle>
    //                 <TextAnimate
    //                     text="2023&nbsp;Golf&nbsp;Tournament&nbsp;&&nbsp;The&nbsp;Challenge"
    //                     sx={{ color: 'primary.main' }}
    //                     variants={varFade().inRight}
    //                 />

    //                 <m.div variants={varFade().inRight}>
    //                     <Typography
    //                         variant="h5"
    //                         sx={{
    //                             mt: 5,
    //                             color: 'common.white',
    //                             fontWeight: 'fontWeightMedium',
    //                         }}
    //                     >
    //                         Encanterra County Club boasts a Tom Lehmann designed championship golf course with panoramic
    //                         views of both the Superstition and San Tan Mountains. At 7,176 yards, this stunning course
    //                         provides challenges for golfers of all levels and abilities. Named among the Top Ten New
    //                         Courses in 2008, Encanterra has hosted some of the Valley's premier golf events, including
    //                         The Gateway Tour Championship, The LGAA Thunderbirds Classic and sectional qualifying rounds
    //                         for both the US Open and US Senior Open.
    //                     </Typography>
    //                 </m.div>
    //             </ContentStyle>
    //         </Container>
    //     </RootStyle>
    // );
}
