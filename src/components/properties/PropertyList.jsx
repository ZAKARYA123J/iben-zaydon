import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, useBreakpointValue } from '@chakra-ui/react';
import PropertyCard from './PropertyCard';
import PropertyDetailModal from './PropertyDetailModal';
import PropertySearchPage from './fillter';
import NotFound from './notfound';
import Pagination from './pagination';
import { useRouter } from 'next/router';
import Maps from './maps';

const POSTS_API_URL = '/api/posts';

const PropertyList = () => {
    const showSearch = true;
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('TOUS TYPE');
    const [selectedPropertyType, setSelectedPropertyType] = useState('View All');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRoomCount, setSelectedRoomCount] = useState('Tous chambre');
    const [selectedBathroomsCount, setSelectedBathroomsCount] = useState('Tous Salle de bain');
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isMapView, setIsMapView] = useState(true);
    const router = useRouter();

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const fetchData = async () => {
        try {
            const queryParams = new URLSearchParams();

            if (activeTab === 'Pour Location') {
                queryParams.append('categoryId', '2');
            } else if (activeTab === 'Pour Vente') {
                queryParams.append('categoryId', '1');
            }

            if (selectedPropertyType !== 'View All') {
                queryParams.append('type', selectedPropertyType);
            }

            if (selectedCity && selectedCity !== 'All Ville') {
                queryParams.append('search', selectedCity);
            }

            if (selectedRoomCount !== 'Tous chambre') {
                queryParams.append('rooms', selectedRoomCount);
            }

            if (selectedBathroomsCount !== 'Tous Salle de bain') {
                queryParams.append('bathrooms', selectedBathroomsCount);
            }

            if (searchQuery) {
                queryParams.append('search', searchQuery);
            }

            const response = await fetch(`${POSTS_API_URL}?${queryParams.toString()}`);
            const data = await response.json();

            console.log('Fetched data:', data);
            setProperties(data);
            setFilteredProperties(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, selectedPropertyType, selectedCity, selectedRoomCount, selectedBathroomsCount, searchQuery]);

    useEffect(() => {
        const { page } = router.query;
        if (page) {
            setCurrentPage(parseInt(page, 10));
        } else {
            setCurrentPage(1);
        }
    }, [router.query]);

    useEffect(() => {
        const { query } = router;
        if (query.modal === 'yes' && query.id) {
            const propertyId = parseInt(query.id, 10);
            const property = filteredProperties.find(item => item.id === propertyId);
            if (property) {
                setSelectedProperty(property);
            } else {
                setSelectedProperty(null);
            }
        } else {
            setSelectedProperty(null);
        }
    }, [router.query, filteredProperties, router]);

    useEffect(() => {
        const { city, roomCount, bathroomsCount } = router.query;

        if (router.isReady) {
            handleCityChange(city || '');
            handleRoomCountChange(roomCount || 'Tous chambre');
            handleBathroomsCountChange(bathroomsCount || 'Tous Salle de bain');
        }

    }, [router.isReady, router.query]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const currentQuery = {
            ...router.query,
            page: pageNumber,
            tab: activeTab,
            propertyType: selectedPropertyType,
            city: selectedCity,
            roomCount: selectedRoomCount,
            bathroomsCount: selectedBathroomsCount,
        };

        router.replace({
            pathname: router.pathname,
            query: currentQuery,
        }, undefined, { shallow: true });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const handlePropertyTypeChange = (type) => {
        setSelectedPropertyType(type);
    };
    const handleCityChange = (city) => {
        setSelectedCity(city);
    };
    const handleRoomCountChange = (count) => {
        console.log('Room count changed to:', count);
        setSelectedRoomCount(count);
    };
    const handleBathroomsCountChange = (count) => {
        console.log('Bathrooms count changed to:', count);
        setSelectedBathroomsCount(count);
    };

    const currentItems = Array.isArray(filteredProperties) ? filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    console.log('Current items:', currentItems);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const toggleView = () => {
        setIsMapView(!isMapView);
    };

    const isMobileView = useBreakpointValue({ base: true, md: false });

    return (
        <Box>
            <PropertySearchPage
                onTabChange={handleTabChange}
                onPropertyTypeChange={handlePropertyTypeChange}
                properties={properties}
                onCityChange={handleCityChange}
                onRoomCountChange={handleRoomCountChange}
                onBathroomsCountChange={handleBathroomsCountChange}
                onSearchChange={handleSearchChange}
                searchDisplay={showSearch ? 'block' : 'none'}
                num={4}
            />
            {isMobileView && (
                <Box display={{ base: 'block', md: 'none' }} textAlign="center" mb={4} position="fixed" bottom={0} left="50%" transform="translateX(-50%)" zIndex={1}>
                    <Button 
                        onClick={toggleView} 
                        size="lg" // Increased button size
                        colorScheme='ble.600'
                        background="blue.600" // Changed button background color to blue.600
                        color="white" // Changed text color to white
                        rightIcon={<img src={isMapView ? "/images/maps.png": "/images/detail.png"  } alt="Icon" style={{ 
                            width: '35px', 
                            height: '35px', 
                            border: ' solid white', 
                            borderRadius: '50%', 
                            backgroundColor: 'white' 
                        }} />} 
                    >
                        {isMapView ? 'Afficher  Map' :'Afficher  List' }
                    </Button>
                </Box>
            )}
            <Box display="flex" style={{ height: '100vh' }}>
                {(!isMapView || !isMobileView) && (
                    <Box flex="1" position="sticky" top="0" height="100%" w="full" overflow="hidden">
                        <Maps
                            center={[31.7917, -7.0926]}
                            markers={properties.map(property => ({
                                id: property.id,
                                position: [property.lat, property.lon],
                                imageUrl: property.img[0],
                                title: property.title,
                                adress: property.adress,
                                label: property.type?.type,
                                price: property.prix,
                                // iconUrl: '/images/Appartement.svg',
                                //=> {
                                //     switch (property.type?.type) {
                                //         // case "Appartement":
                                //         //     return '/images/Appartement.svg';
                                //         // case "Local":
                                //         //     return '/images/local.svg';
                                //         // case "Maisons":
                                //         //     return '/images/maison.svg';
                                //         // case "Bureaux":
                                //         //     return '/images/bureaux.svg';
                                //         // case "Terrains":
                                //         //     return '/images/terrains.svg';
                                //         // case "villasRiad":
                                //         //     return '/images/villa.svg';
                                //         default:
                                //             return '/images/Appartement.svg';
                                //     }
                                // }
                                
                                // number: property.id
                            }))}
                        />
                    </Box>
                )}
                {(isMapView || !isMobileView) && (
                    <Box flex="1" overflowY="auto" p={4}>
                        <Box display="flex" justifyContent="center">
                            {currentItems.length > 0 ? (
                                <Box maxW="7xl" w="full">
                                    <Grid
                                        templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
                                        gap={6}
                                        mx="auto"
                                    >
                                        {currentItems.map((property) => (
                                            <PropertyCard
                                                key={property.id}
                                                property={property}
                                                onClick={() => {
                                                    setSelectedProperty(property);
                                                    router.push({
                                                        pathname: '/properties',
                                                        query: { modal: 'yes', id: property.id },
                                                    });
                                                }}
                                            />
                                        ))}
                                    </Grid>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        rowsPerPage={itemsPerPage}
                                        totalRows={filteredProperties.length}
                                        onRowsPerPageChange={handleItemsPerPageChange}
                                    />
                                </Box>
                            ) : (
                                <NotFound />
                            )}
                        </Box>
                        {selectedProperty && (
                            <PropertyDetailModal
                                isOpen={!!selectedProperty}
                                onClose={() => router.push('/properties')}
                                property={selectedProperty}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PropertyList;
