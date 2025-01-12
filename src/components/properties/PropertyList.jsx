import React, { useState } from 'react';
import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import Maps from './maps';

const PropertyList = () => {
    const [isMapView, setIsMapView] = useState(true);

    const toggleView = () => {
        setIsMapView(!isMapView);
    };

    const isMobileView = useBreakpointValue({ base: true, md: false });

    const mapCenter = [31.629472, -7.981084]; // Center the map around Morocco

    const markers = [
        {
            id: 1,
            position: [30.4192322, -9.5927346], // Agadir
            title: 'Ibn Zaydoun',
            imageUrl: '/images/ibn.jpg',
            address: 'Agadir Address',
            link: 'https://my.matterport.com/show/?m=EQMUt4KGE3k&back=1',
        },
        {
            id: 2,
            position: [33.5731104, -7.5898434], // Casablanca
            title: 'Casablanca - Coming Soon',
            imageUrl: '/images/coming-soon.jpg',
            address: 'Casablanca Address',
            link: "null",
        },
        {
            id: 3,
            position: [34.020882, -6.841650], // Rabat
            title: 'Rabat - Coming Soon',
            imageUrl: '/images/coming-soon.jpg',
            address: 'Rabat Address',
            link: "null",
        },
        {
            id: 4,
            position: [31.629472, -7.981084], // Marrakech
            title: 'Marrakech - Coming Soon',
            imageUrl: '/images/coming-soon.jpg',
            address: 'Marrakech Address',
            link: "null",
        },
        {
            id: 5,
            position: [35.759465, -5.834036], // Tangier
            title: 'Tangier - Coming Soon',
            imageUrl: '/images/coming-soon.jpg',
            address: 'Tangier Address',
            link: "null",
        },
    ];

    const handleMarkerClick = (marker) => {
        if (marker.link) {
            window.open(marker.link, '_blank'); // Open the link in a new tab
        } else {
            alert(`${marker.title} is coming soon!`);
        }
    };

    return (
        <Box>
            <Box display="flex" style={{ height: '100vh' }}>
                <Box flex="1" position="relative" w="full" overflow="hidden">
                    <Maps
                        center={mapCenter}
                        markers={markers}
                        onMarkerClick={handleMarkerClick}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyList;
