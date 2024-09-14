import { Box, Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Layout from '../components/Index/Layout'
import { ChakraBaseProvider } from '@chakra-ui/react'
import ContactForm from '../components/Index/ContactForm'
import Footer from '../components/Index/Footer'
import theme from '../types/CmsSingleTypes/theme'
import '../styles/globals.css';


const ContactUsPage = ({ siteInfo }) => {
	return (
		<>
        <ChakraBaseProvider theme={theme}>
			{/* <SEO
				seo={{
					title: contactPage.title,
					description: metaDescriptionFromHtml(contactPage.pageBody),
				}}
				siteInfo={siteInfo}
			/> */}
			<Layout siteInfo={siteInfo} >
				<Box>
				<Container>
					<Stack direction={['column', 'row']} mt={[0, '2rem']} mb={'3rem'}>
							<ContactForm/>
							
					</Stack>
				</Container>
				<Footer/>
				</Box>
			</Layout>
			
            </ChakraBaseProvider>
		</>
	)
}

// export const getStaticProps: GetStaticProps = async () => {
// 	const [contactPage, siteInfo] = await Promise.all([
// 		getData('contact-page'),
// 		getSiteInfo(),
// 	])

// 	return {
// 		props: { contactPage, siteInfo },
// 	}
// }

export default ContactUsPage
