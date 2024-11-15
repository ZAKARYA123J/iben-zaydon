import { memo } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Layout from '../components/Index/Layout'
import { ChakraBaseProvider } from '@chakra-ui/react'
import ContactForm from '../components/Index/ContactForm'
import Footer from '../components/Index/Footer'
import theme from '../types/CmsSingleTypes/theme'
import { WhatsApp } from '../components/whatssap';
import '../styles/globals.css';
const ContactUsPage = ({ siteInfo }) => {
	return (
		<>
        <ChakraBaseProvider theme={theme}>
			<Layout siteInfo={siteInfo} >
				<Box>
				<Container>
					<Stack direction={['column', 'row']} mt={[0, '2rem']} mb={'3rem'}>
							<ContactForm
							displayProp='block'
							/>
					</Stack>
				</Container>
				<Footer/>
				<WhatsApp />
				</Box>
			</Layout>
			
            </ChakraBaseProvider>
		</>
	)
}
export default memo(ContactUsPage)
