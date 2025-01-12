import React, { useState } from 'react';
import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import Maps from './maps';

const PropertyList = () => {
    const [isMapView, setIsMapView] = useState(true);

    const toggleView = () => {
        setIsMapView(!isMapView);
    };

    const isMobileView = useBreakpointValue({ base: true, md: false });

    const mapCenter = [30.4192322, -9.5927346]; // Coordinates for your static map location
    const marker = {
        id: 1,
        position: mapCenter,
        title: 'Ibn Zaydoun',
        address: 'Location Address',
        link: 'https://my.matterport.com/show/?m=EQMUt4KGE3k&back=1',
    };

    const handleMarkerClick = (marker) => {
        if (marker.link) {
            window.open(marker.link, '_blank'); // Open the link in a new tab
        }
    };

    return (
        <Box>
            {isMobileView && (
                <Box
                    display={{ base: 'block', md: 'none' }}
                    textAlign="center"
                    mb={4}
                    position="fixed"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={1}
                >
                    <Button
                        onClick={toggleView}
                        size="lg"
                        colorScheme="blue"
                        background="blue.600"
                        color="white"
                    >
                        {isMapView ? 'Afficher Map' : 'Afficher List'}
                    </Button>
                </Box>
            )}
            <Box display="flex" style={{ height: '100vh' }}>
                <Box flex="1" position="relative" w="full" overflow="hidden">
                    <Maps
                        center={mapCenter}
                        markers={[marker]}
                        onMarkerClick={handleMarkerClick}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyList;
