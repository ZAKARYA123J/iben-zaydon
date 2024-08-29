import { Box, Stack, VStack } from '@chakra-ui/react'
import Hero from '../components/Hero'
import Container from '../components/Container'
import Layout from '../components/Layout'
import theme from '../types/CmsSingleTypes/theme'
import { ChakraBaseProvider } from '@chakra-ui/react'
import Footer from '../components/Footer'
import '../styles/globals.css';  
// import getData, { getSiteInfo } from '../utils/data'
// import CmsRichText from '../components/CmsRichText'
// import ContactForm from '../components/ContactForm'
// import Phone from '../components/Phone'
// import SEO from '../components/SEO'
// Ensure the path is correct
import ContactForm from '../components/ContactForm'
import Cta3 from '../components/cta'
import Popular from '../components/popular-post'
import Aboutt from '../components/aboutt'
import HomeFinancingSteps from '../components/home'






const HomePage = ({ homePage, galleryPage, houses, siteInfo }) => {
    return (
        <>
        <ChakraBaseProvider theme={theme}>
            <Layout siteInfo={siteInfo}>
                <Hero {...homePage} />
                <Container>
                    <Stack direction={['column-reverse', 'row']}>
                        <Box >
                            <ContactForm
                                siteInfo={siteInfo}
                                shouldHaveNegativeTopMargin
                            />
                        </Box>
                    </Stack>
                    
                    {/* Add Gallery section */}
                    {/* <Box mt={'4rem'}>
                        <Gallery galleryPage={galleryPage} houses={houses} siteInfo={siteInfo} />
                    </Box> */}
                    {/* Uncomment to include testimonials */}
                    {/* <Heading mt={'2rem'}>{homePage.featuredTestimonialsHeading}</Heading> */}
                    {/* <VStack spacing={'3rem'} my={'3rem'}>
                        {homePage.featuredTestimonials.data.map(
                            (testimonialData, index) => (
                                <TestimonialCard
                                    key={index}
                                    testimonial={testimonialData.attributes}
                                    index={index}
                                />
                            )
                        )}
                    </VStack> */}
                </Container>
                <Popular/>
                <Aboutt/>
                <HomeFinancingSteps/>
                <Cta3/>
                
            </Layout> 
            <Footer/>
            </ChakraBaseProvider>
            
        </>
        
    )
}

// export const getStaticProps = async () => {
//     const [homePage, galleryPage, houses, siteInfo] = await Promise.all([
//         getData('home-page?populate=*'),
//         getData('our-homes-page'),
//         getData('houses?populate=thumbnail'),
//         getSiteInfo(),
//     ])

//     return {
//         props: {
//             homePage,
//             galleryPage,
//             houses,
//             siteInfo,
//         },
//     }
// }

export default HomePage