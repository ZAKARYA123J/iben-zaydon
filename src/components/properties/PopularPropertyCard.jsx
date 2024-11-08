import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  Button,
  Tag,
  Link,
} from "@chakra-ui/react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { SiWhatsapp } from "react-icons/si";

const PopularCard = ({ currentCategory }) => {
  const [gridDisplay, setGridDisplay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState([]);
  const intervalRef = useRef(null);
  const screenSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const transformedData = posts.map((post) => {
    const detail = details.find((detail) => detail.postId === post.id) || {};
    return {
      id: post.id,
      imageSrc: post.img[0] || "/images/card.jpeg",
      title: post.title,
      type: post.type?.type || "Unknown",
      location: post.adress,
      ville: post.ville,
      detail: detail,
      category: post.category?.name || "Unknown",
      rooms: detail.rooms,
      bathrooms: detail.bathrooms,
      area: detail.surface,
      price: `${post.prix || "0"}`,
    };
  });

  const filteredData = transformedData.filter(
    (card) => card.category === currentCategory
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch(
          "/api/posts"
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);

        const detailsResponse = await fetch(
          "/api/details"
        );
        const detailsData = await detailsResponse.json();
        setDetails(detailsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setGridDisplay(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = () => {
      if (window.innerWidth >= 1024) {
        setCurrentSlide((prev) => (prev + 1) % (filteredData.length - 2));
      } else if (window.innerWidth >= 640) {
        setCurrentSlide((prev) => (prev + 1) % (filteredData.length - 1));
      } else {
        setCurrentSlide((prev) => (prev + 1) % filteredData.length);
      }
    };

    if (gridDisplay) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(interval, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gridDisplay, filteredData.length, screenSize]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      width="auto"
    >
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={filteredData.length}
        visibleSlides={slidesToShow}
        infinite={true}
        isIntrinsicHeight={true}
        className="w-full max-w-7xl"
        currentSlide={currentSlide}
      >
        <Slider>
          {filteredData.map((card, index) => (
            <Slide
              key={card.id}
              index={index}
              style={{ margin: "0 10px", width: "100%" }}
            >
              <Box
                className="property-item homeya-box card"
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                overflow="hidden"
                transition="0.3s"
                width={{ base: "260px", md: "300px", lg: "400px" }} // Set a fixed width for all screen sizes
              >
                <Link
                  href={`/properties?modal=yes&id=${card.id}`}
                  className="images-group"
                >
                  <Box position="relative" height="200px">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      objectFit="cover"
                      loading="lazy"
                      width="100%"
                      height="100%"
                      borderRadius="md"
                      className="hover-image"
                    />
                    <Flex position="absolute" top={2} left={2} gap={2}>
                      {card.category === "Vente" && (
                        <Tag bg="green.900" color="white" fontWeight="bold">
                          {card.category}
                        </Tag>
                      )}
                      {card.category === "Location" && (
                        <Tag bg="red.600" color="white" fontWeight="bold">
                          {card.category}
                        </Tag>
                      )}
                    </Flex>
                  </Box>
                </Link>
                <Box mt={1} p={4}>
                  <Flex align="center" justify="space-between" mt={1}>
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
                  <Flex justify="space-between" mt={2}>
                    {card.rooms != null && (
                      <Flex align="center">
                        <FaBed />
                        <Text ml={1}>{card.rooms} Chambre</Text>
                      </Flex>
                    )}
                    {card.bathrooms != null && (
                      <Flex align="center">
                        <FaBath />
                        <Text ml={1}>{card.bathrooms} Salle de bain</Text>
                      </Flex>
                    )}
                    {card.area != null && (
                      <Flex align="center">
                        <FaExpandArrowsAlt />
                        <Text ml={1}>{card.area} m²</Text>
                      </Flex>
                    )}
                  </Flex>
                </Box>
                <Flex justify="space-between" align="center" p={4}>
                  <Tag p={1.5} bg="blue.600" color="white" fontWeight="bold" fontSize="xl">
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
                      px="4"
                      py="2"
                      color="white"
                      fontWeight="bold"
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </Box>
  );
};

export default PopularCard;
