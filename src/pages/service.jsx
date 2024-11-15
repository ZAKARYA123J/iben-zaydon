import React, { useState, useEffect, useRef, memo} from "react"; // Import useRef
import { Box, Container, ChakraBaseProvider } from "@chakra-ui/react"; // Combine Chakra UI imports
import theme from "../types/CmsSingleTypes/theme";
import Footer from "../components/Index/Footer";
import "../styles/globals.css";
import Layout from "../components/Index/Layout";
import Manage from "../components/manage";
import ContactForm from "../components/Index/ContactForm";
import CoreFeatures from "../components/CoreFeatures";
import Work from "../components/work";
import Heroservice from "../components/heroservice";
import { WhatsApp } from '../components/whatssap';

const service = ({ siteInfo }) => {
  const contactFormRef = useRef(null); // Create a ref for the ContactForm

  const scrollToContact = () => { // Function to scroll to the ContactForm
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <Layout siteInfo={siteInfo}>
        <Box>
          <Heroservice />
          <CoreFeatures 
          firsttitle="Gestion immobilière"
          title="Gérer tous les biens immobiliers avec une garantie de rendement mensuel fixe"
          text="Gérez tous vos biens immobiliers par l'intermédiaire de notre bureau, avec des rendements garantis et sans tracas."
          image="/images/sale.jpg"
          button="Contactez nous"
          onClick={scrollToContact} // Attach the scroll function to button click
          />
          <Box>
            <Work
            titlesmall="Gestion immobilière"
            titlebig="Processus de gestion des biens immobiliers"
            title1="Contacter l'Agence"
            text1="Collaborer avec notre équipe pour assurer la gestion efficace de vos biens, garantissant des rendements optimaux."
            title2="Évaluation des Biens"
            text2="Analyse approfondie pour maximiser la valeur de vos propriétés et optimiser leur gestion."
            title3="Accord sur les Conditions"
            text3="Établissement d’un contrat clair avec des conditions adaptées à vos besoins spécifiques."
            title4="Suivi et Reporting"
            text4="Mise en place d’un système de suivi régulier pour assurer transparence et performance des investissements."
            
            />
          </Box>
          <CoreFeatures 
          firsttitle="Vendre votre bien"
          title="Bienvenue pour nous faire découvrir votre bien"
          text="Vous êtes au bon endroit pour confier votre bien à notre agence et vous assurer une vente légale et rentable."
          image="/images/manger.jpg"
          button="Contactez nous"
          onClick={scrollToContact} // Attach the scroll function to button click
          />
          <Box>
            <Work
            titlesmall="Vente d'un bien immobilier"
            titlebig="Processus de vente de biens immobiliers"
            title1="Évaluation"
            text1="Estimation du bien pour déterminer un prix de vente juste et attractif."
            title2="Mise en Marché"
            text2="Création et diffusion d'annonces pour attirer des acheteurs potentiels."
            title3="Visites et Négos"
            text3="Organisation des visites et facilitation des négociations pour obtenir les meilleures offres."
            title4="Finalisation"
            text4="Gestion des formalités et rédaction des documents pour conclure la vente."
            />
          </Box>
          <Container maxW={{ base: "none", md: "container.xl" }} py={4}>
            <ContactForm ref={contactFormRef} /> 
          </Container>
          <Footer />  
          <WhatsApp />
        </Box>
      </Layout>
    </ChakraBaseProvider>
  );
};
export default memo(service);
