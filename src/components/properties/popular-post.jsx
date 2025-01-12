import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    Image,
    Grid,
    Icon,
    Tag,
    HStack
} from '@chakra-ui/react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FaBed, FaBath, FaExpandArrowsAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { SiWhatsapp } from "react-icons/si";
import Link from 'next/link';


const Popular = () => {
    const [gridDisplay, setGridDisplay] = useState(false); // Default value
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [posts, setPosts] = useState([]);
    const [details, setDetails] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const totalSlides = posts.length;
    const intervalRef = useRef(null);

    useEffect(() => {
        // Fetch posts and details from APIs
        const fetchData = async () => {
            try {
                const postsResponse = await fetch('/api/posts');
                const postsData = await postsResponse.json();
                if (Array.isArray(postsData)) {
                    setPosts(postsData);
                } else {
                    console.error('Expected an array for posts, received:', postsData);
                }

                const detailsResponse = await fetch('/api/details');
                const detailsData = await detailsResponse.json();
                setDetails(detailsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 1024; // Example condition
            setGridDisplay(isLargeScreen);
            setSlidesToShow(isLargeScreen ? 3 : window.innerWidth >= 640 ? 2 : 1);
        };

        handleResize(); // Call on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = () => {
            if (window.innerWidth >= 640) {
                setCurrentSlide(prev => (prev + 1) % (totalSlides - 1));
            } else {
                setCurrentSlide(prev => (prev + 1) % totalSlides);
            }
        };

        if (gridDisplay) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else {
            intervalRef.current = setInterval(interval, 2000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gridDisplay, totalSlides]);

    // Transform API data into the format expected by the component
    const transformedData = Array.isArray(posts) ? posts.map(post => {
        const detail = details.find(detail => detail.postId === post.id) || {};
        return {
            id: post.id,
            imageSrc: post.img[0] || '/images/card.jpeg', // Default image if none provided
            title: post.title,
            type: post.type?.type || 'Unknown',
            location: post.adress,
            ville: post.ville,
            rooms: detail.rooms,
            category: post.category?.name || 'Unknown',
            bathrooms: detail.bathrooms,
            area: detail.surface,
            price: post.prix,
            images: post.img.map((url, index) => ({
                alt: `image${index + 1}`,
                url
            }))
        };
    }) : [];

    // Filter data based on selected type
    const filteredData = filterType === 'All' ? transformedData : transformedData.filter(card => card.type === filterType);

    // Get unique types from the data
    const uniqueTypes = ["Appartement", "Maisons", "villasRiad", "Bureaux", "Local", "Terrains"]; // Fixed spacing

    const filterall = (filterType === 'All');
    // Handle filter type change
    const handleFilterTypeChange = (type) => {
        setFilterType(type);
        setCurrentSlide(0); // Reset to the first slide
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <Box textAlign="center" mt={8} mb={6}>
                <Heading fontSize="4xl" mb={4}>Annonces d'accueil dans Votre Immocean</Heading>
                <Text color="gray.400" maxWidth="xl" mx="auto">
                    Avec plus d'un million de biens disponibles, il est facile de trouver le bien qui vous convient.
                </Text>
            </Box>

            {/* Filter Buttons */}
        


            {gridDisplay ? (
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                    gap={6}
                    maxW="7xl"
                >
                    {filteredData.slice(0, 6).map(card => (
                        <Box
                            key={card.id}
                            className="property-item homeya-box card"
                            width="400px"
                            bg="white"
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="lg"
                            transition="0.3s"
                            maxW="lg"  // Set maximum width
                        >
                            <Link href={`/properties?modal=yes&id=${card.id}`} _hover={{ textDecoration: "none" }} className="images-group">
                                <Box position="relative" height="200px" className="image-container"> {/* Fixed height */}

                                    <Image
                                        src={card.imageSrc}
                                        alt={card.title}
                                        loading="lazy"
                                        objectFit="cover"
                                        borderRadius="md"
                                        width="100%"
                                        height="100%"
                                        className="hover-image" // Added class for hover effect
                                    />

                                    <Flex position="absolute" top={2} left={2} gap={2}>
                                        {card.category === 'Vente' && (
                                            <Tag bg="green.900" color="white" fontWeight="bold">
                                                {card.category}
                                            </Tag>
                                        )}
                                        {card.category === 'Location' && (
                                            <Tag bg="red.600" color="white" fontWeight="bold">
                                                {card.category}
                                            </Tag>
                                        )}
                                    </Flex>
                                </Box>

                                <Box mt={2} p={2}>
                                    <Flex
                                        align="center"
                                        justify="space-between" // Changed to space-between to push content to edges
                                        mt={1}
                                    >
                                        <Text
                                            fontWeight="bold"
                                            fontSize="lg"
                                            isTruncated
                                            cursor="pointer"
                                            color="blue.800"
                                            _hover={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            {card.title}
                                        </Text>
                                        <Tag bg="blue.600" color="white" fontWeight="bold">
                                            {card.ville}
                                        </Tag>
                                    </Flex>
                                    <Flex align="center" mt={1}>
                                        <FaMapMarkerAlt />
                                        <Text ml={1} isTruncated>
                                            {card.location}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between" mt={2}>
                                        {card.rooms != null && ( // Check if bedrooms is not null
                                            <Flex align="center">
                                                <FaBed />
                                                <Text ml={1}>{card.rooms} Chambre</Text>
                                            </Flex>
                                        )}
                                        {card.bathrooms != null && ( // Check if bathrooms is not null
                                            <Flex align="center">
                                                <FaBath />
                                                <Text ml={1}>{card.bathrooms} Salle de bain</Text>
                                            </Flex>
                                        )}
                                        {card.area != null && ( // Check if area is not null
                                            <Flex align="center">
                                                <FaExpandArrowsAlt />
                                                <Text ml={1}>{card.area} m²</Text>
                                            </Flex>
                                        )}
                                    </Flex>
                                </Box>

                                <Flex justify="space-between" align="center"  p={4} mt={4}>
                                    <Tag p={1.5} bg="blue.600" color="white" fontWeight="bold" fontSize="xl" >
                                        {card.price}
                                    </Tag>
                                    <Flex>
                                        <Button
                                            leftIcon={<Icon as={SiWhatsapp} />}
                                            colorScheme="green"
                                            onClick={() => {
                                                const message = encodeURIComponent(`Interested in property ${card.title} with ID ${card.id}, priced at ${card.price}. View more at http://localhost:3000/properties?modal=yes&id=${card.id}`);
                                                window.open(`https://wa.me/+4915157575045?text=${message}`, "_blank");
                                            }}
                                            position="relative"
                                            zIndex="1"
                                            px="4" // Reduced padding on x-axis
                                            py="2" // Reduced padding on y-axis
                                            color="white"
                                            fontWeight="bold"
                                            fontSize={{ base: "xs", md: "sm", lg: "md" }} // Smaller font sizes
                                            bg="#198754"
                                            borderRadius="15px"
                                            boxShadow="md"
                                            overflow="hidden"
                                            transition="all 0.25s"
                                            _hover={{
                                                color: "#white",
                                                _before: {
                                                    width: "100%",
                                                },
                                            }}
                                            _before={{
                                                content: '""',
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: "100%",
                                                width: "0",
                                                borderRadius: "15px",
                                                bg: "#20c997",
                                                zIndex: "-1",
                                                boxShadow: "md",
                                                transition: "all 0.25s",
                                            }}
                                        >
                                            WhatsApp
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Link>
                        </Box>
                    ))}
                </Grid>
            ) : (
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={totalSlides}
                    visibleSlides={slidesToShow}
                    infinite={true}
                    isIntrinsicHeight={true}
                    className="w-full max-w-7xl"
                    currentSlide={currentSlide}
                >
                    <Slider>
                        {transformedData.map(card => (
                            <Slide key={card.id} index={card.id} style={{ margin: '0 10px' }}>
                                <Link href={`/properties?modal=yes&id=${card.id}`} _hover={{ textDecoration: "none" }} className="images-group">
                                    <Box className="property-item homeya-box card" bg="white" borderRadius="md" boxShadow="lg" overflow="hidden" transition="0.3s">
                                        <Box position="relative" height="350px"> {/* Fixed height for consistency */}
                                            <Image
                                                src={card.imageSrc}
                                                alt={card.title}
                                                loading="lazy"
                                                objectFit="cover" // Ensures image covers the area without distortion
                                                width="100%"
                                                height="100%" // Ensures the image fills the container
                                            />
                                            <Flex position="absolute" top={2} left={2} gap={2}>
                                                {card.category === 'Vente' && (
                                                    <Tag bg="green.900" color="white" fontWeight="bold">
                                                        {card.category}
                                                    </Tag>
                                                )}
                                                {card.category === 'Location' && (
                                                    <Tag bg="red.600" color="white" fontWeight="bold">
                                                        {card.category}
                                                    </Tag>
                                                )}
                                            </Flex>
                                            <Flex position="absolute" bottom={2} left={2}>
                                                <Tag bg="white" color="black" fontWeight="bold">
                                                    {card.type && card.type ? card.type : 'Unknown'}
                                                </Tag>
                                            </Flex>
                                        </Box>

                                        <Box mt={1} p={4}>
                                            <Flex
                                                align="center"
                                                justify="space-between" // Changed to space-between to push content to edges
                                                mt={1}
                                            >
                                                <Text
                                                    fontWeight="bold"
                                                    fontSize="lg"
                                                    isTruncated
                                                    cursor="pointer"
                                                    color="blue.800"
                                                    _hover={{ textDecoration: "none", color: "inherit" }}
                                                >
                                                    {card.title}
                                                </Text>
                                                <Tag bg="blue.600" color="white" fontWeight="bold">
                                                    {card.ville}
                                                </Tag>
                                            </Flex>
                                            <Flex alignItems="center" mt={1}>
                                                <FaMapMarkerAlt />
                                                <Text ml={1} isTruncated>
                                                    {card.location}
                                                </Text>
                                            </Flex>
                                            <HStack spacing={4} mt={2}>
                                                <Flex alignItems="center">
                                                    {card.rooms != null && ( // Check if bedrooms is not null
                                                        <Flex align="center">
                                                            <FaBed />
                                                            <Text ml={1}>{card.rooms} Chambre</Text>
                                                        </Flex>
                                                    )}
                                                    {card.bathrooms != null && ( // Check if bathrooms is not null
                                                        <Flex align="center">
                                                            <FaBath />
                                                            <Text ml={1}>{card.bathrooms} Salle de bain</Text>
                                                        </Flex>
                                                    )}
                                                    {card.area != null && ( // Check if area is not null
                                                        <Flex align="center">
                                                            <FaExpandArrowsAlt />
                                                            <Text ml={1}>{card.area}</Text>
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            </HStack>
                                        </Box>
                                        <Flex justify="space-between" align="center"  p={4}>
                                            <Text fontWeight="bold" color="blue.800" fontSize="xl">{card.price}</Text>
                                            <Flex>
                                                <Button
                                                    leftIcon={<Icon as={SiWhatsapp} />}
                                                    colorScheme="green"
                                                    onClick={() => {
                                                        const message = encodeURIComponent(`Interested in property ${card.title} with ID ${card.id}, priced at ${card.price}. View more at http://localhost:3000/properties?modal=yes&id=${card.id}`);
                                                        window.open(`https://wa.me/+4915157575045?text=${message}`, "_blank");
                                                    }}
                                                    position="relative"
                                                    zIndex="1"
                                                    px="4" // Reduced padding on x-axis
                                                    py="2" // Reduced padding on y-axis
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize={{ base: "xs", md: "sm", lg: "md" }} // Smaller font sizes
                                                    bg="#198754"
                                                    borderRadius="15px"
                                                    boxShadow="md"
                                                    overflow="hidden"
                                                    transition="all 0.25s"
                                                    _hover={{
                                                        color: "#white",
                                                        _before: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                    _before={{
                                                        content: '""',
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        height: "100%",
                                                        width: "0",
                                                        borderRadius: "15px",
                                                        bg: "#20c997",
                                                        zIndex: "-1",
                                                        boxShadow: "md",
                                                        transition: "all 0.25s",
                                                    }}
                                                >
                                                    WhatsApp
                                                </Button>
                                            </Flex>
                                        </Flex>

                                    </Box>
                                </Link>
                            </Slide>
                        ))}
                    </Slider>
                </CarouselProvider>
            )}
        </Box>
    );
};

export default Popular;