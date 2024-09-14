import { ChakraBaseProvider } from '@chakra-ui/react'
import { Box, Stack, VStack } from '@chakra-ui/react'
import About from '../components/Index/About'
import Layout from '../components/Index/Layout'
// import Hero from '../components/Hero'
import theme from '../types/CmsSingleTypes/theme'
// import Container from '../components/Container'
import '../styles/globals.css';  
import Footer from '../components/Index/Footer'






const about = ({ siteInfo}) => {
    return (
        <>
            <ChakraBaseProvider theme={theme}>
                <Layout siteInfo={siteInfo}>

                <About />
               
                <Footer/>
                </Layout>
                
            </ChakraBaseProvider>
        </>
    )
}
export default about