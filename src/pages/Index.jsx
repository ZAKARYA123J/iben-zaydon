import React, { useState, useEffect, memo } from 'react';
import { Box, Container, ChakraBaseProvider } from "@chakra-ui/react";
import Hero from "../components/Index/Hero";
import Layout from "../components/Index/Layout";
import theme from "../types/CmsSingleTypes/theme";
import Footer from "../components/Index/Footer";
import "../styles/Carousel.module.scss";
import "../styles/globals.css";
import ContactForm from "../components/Index/ContactForm";
import Cta3 from "../components/Index/cta";
import Popular from "../components/properties/popular-post";
import HomeFinancingSteps from "../components/home";
import Abouta from "../components/Index/abou";
import Counters from "../components/Index/Counters";
import CardService from '../components/service';
import LoadingAnimation from '../components/Loading';
import { WhatsApp } from '../components/whatssap'

const HomePage = ({ siteInfo }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChakraBaseProvider theme={theme}>
      <Layout siteInfo={siteInfo}>
        <Hero />
        <Popular />
        <CardService />
        <HomeFinancingSteps />
        <Abouta />
        <br />
        <Counters />
        <Cta3 />
        <Box>
          <Box overflowX="hidden">
            <Container maxW={{ base: "100%", md: "80%", lg: "80%" }} px={4} py={4}>
              <ContactForm 
                displayProp='none'
              />
            </Container>
          </Box>
        </Box>
        <Footer />
        <WhatsApp />
      </Layout>
    </ChakraBaseProvider>
  );
};

export default memo(HomePage);
