import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Box,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import ContactForm from './contact';
import Carousel from "./Carousel";
import FactsAndFeatures from './factsandfeatures';
import VideoSection from './Videoyoutube';
import PropertyMoreDetail from './propertymoredetail';
import Map from './PropertyLocationMap';
import PopularCard from './PopularPropertyCard';
import PropertySummary from './PropertySumary';

const POSTS_API_URL = '/api/posts';
const DETAILS_API_URL = '/api/details';

const PropertyDetailModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { query } = router;

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const modalWidth = useBreakpointValue({
        base: "90vw",
        md: "80vw",
        lg: "80vw",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (query.modal === 'yes' && query.id) {
                    const postId = parseInt(query.id, 10);

                    // Fetch posts data
                    const postsResponse = await fetch(POSTS_API_URL);
                    const postsData = await postsResponse.json();

                    // Fetch details data
                    const detailsResponse = await fetch(DETAILS_API_URL);
                    const detailsData = await detailsResponse.json();

                    // Find the property from posts
                    const post = postsData.find(item => item.id === postId);
                    if (post) {
                        // Find the corresponding detail
                        const detail = detailsData.find(d => d.postId === postId);

                        // Combine post and detail data
                        setProperty({
                            ...post,
                            ...detail,
                            postid:post.id,
                            images: post.img, // Assuming images are from the post
                            youtubeUrl: post.youtub,
                            location: post.adress,
                            price: post.prix,
                            category: post.category.name,
                            type: post.type.type,
                        });
                    } else {
                        setError('Property not found');
                    }
                }
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching property data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        if (property && property.postid) {
            const newMessage = `Intéressé par le bien ${property.title} avec  ID ${property.postid}, au prix de ${property.price}.`;
            setMessage(newMessage);
            console.log("Message actualisé :", newMessage); // This should log the correct message
        }
    }, [property]);

    // Debugging output to check the message state
    console.log("Message à ContactForm :", message); // This should log the message being passed to ContactForm

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay
                css={{
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    transform: "translateZ(0)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
            <ModalContent maxWidth={modalWidth} width={modalWidth}>
                <ModalHeader fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
                    <Box position="relative">
                        <Box position="absolute" left={0} top="50%" transform="translateY(-50%)" width="4px" height="100%" bg="blue.600"></Box>
                        <Text
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="bold"
                            pl={6}
                        >
                            {property?.title || "Loading..."}  
                        </Text>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column" gap={4}>
                        <Box>
                            <Carousel items={property?.images || []} />
                        </Box>
                        <Box>
                            <PropertySummary
                                title={property?.title}
                                Ville={property?.ville}
                                id={property?.postid}
                                location={property?.location}
                                category={property?.type}
                                bedrooms={property?.bedrooms}
                                kitchens={property?.kitchen}
                                bathrooms={property?.bathrooms}
                                area={property?.surface}
                                price={property?.price}
                            />
                        </Box>
                        <Flex direction={{ base: "column", lg: "row" }} gap={4}>
                            <Box flex={{ base: "1", lg: "0.7" }}>
                                <PropertyMoreDetail
                                    rooms={property?.rooms}
                                    bedrooms={property?.livingrooms}
                                    kitchens={property?.kitchen}
                                    bathrooms={property?.bathrooms}
                                    area={property?.surface}
                                    yearBuilt={property?.constructionyear}
                                    floor={property?.floor}
                                    facing={property?.facade}

                                />
                                <FactsAndFeatures
                                    furnished={property?.furnished}
                                    elevator={property?.elevator}
                                    parking={property?.parking}
                                    balcony={property?.balcony}
                                    pool={property?.pool}
                                    Guard={property?.Guard}
                                    Proprietary={property?.Proprietary}
                                    documents={property?.documents}

                                />
                                <Box position="relative" mt={4} mb={8}>
                                    <Box position="absolute" left={0} top="50%" transform="translateY(-50%)" width="4px" height="100%" bg="blue.600"></Box>
                                    <Text
                                        fontSize={{ base: "xl", md: "2xl" }}
                                        fontWeight="bold"
                                        pl={6}
                                    >
                                        Localisation sur Google Map
                                    </Text>
                                </Box>
                                <Map center={{ lat: property?.lat, lng: property?.lon }} zoom={14} />
                                {property?.youtubeUrl && ( // Check if youtubeUrl is not null
                                    <Box>
                                        <Box position="relative" mt={8} mb={8}>
                                            <Box position="absolute" left={0} top="50%" transform="translateY(-50%)" width="4px" height="100%" bg="blue.600"></Box>
                                            <Text
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                pl={6}
                                            >
                                                Vidéo YouTube
                                            </Text>
                                        </Box>
                                        <VideoSection
                                            src={property?.youtubeUrl}
                                            heading={property?.title}
                                        />
                                    </Box>
                                )}
                            </Box>
                            <ContactForm defaultMessage={message} />
                        </Flex>

                        <Box position="relative" mt={8} mb={8}>
                            <Box position="absolute" left={0} top="50%" transform="translateY(-50%)" width="4px" height="100%" bg="blue.600"></Box>
                            <Text
                                fontSize={{ base: "xl", md: "2xl" }}
                                fontWeight="bold"
                                pl={6}
                            >
                                Annonces similaires
                            </Text>
                        </Box>
                        <PopularCard currentCategory={property?.category} />
                        <Image
                            src="/images/footer-art.svg"
                            alt=""
                            width="1200"
                            height="160"
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PropertyDetailModal;
