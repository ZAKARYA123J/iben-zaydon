import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box ,Button} from "@chakra-ui/react";
import Image from 'next/image';
import "leaflet/dist/leaflet.css";
import Link from 'next/link';

// Dynamically import MapContainer with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import("react-leaflet").then(mod => mod.ZoomControl), { ssr: false });

export default function Maps({ center, markers = [] }) {
  const [iconCache, setIconCache] = useState({});

useEffect(() => {
    import("leaflet").then(L => {
        const iconUrl = '/images/Appartement.svg';
        if (!iconCache[iconUrl]) {
            const icon = L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            setIconCache(prevCache => ({ ...prevCache, [iconUrl]: icon }));
        }
    });
}, []); // Empty dependency array to avoid recalculating icon on every render


  return (
    <Box maxW="7xl" mx="auto" p={4}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" h={{ base: "500px", md: "800px"}}>
        {Object.keys(iconCache).length > 0 && (
          <MapContainer
            center={center}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position="topright" />
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={iconCache['/images/Appartement.svg']}
              >
                <Popup>
                  <div className="flex w-64 h-40">
                    <div className="w-2/5 h-full relative">
                      <Link href={`/properties?modal=yes&id=${marker.id}`}>
                        <Image
                          src={marker.imageUrl}
                          alt={marker.title}
                          fill
                          objectFit="cover"
                          className="rounded-l-md"
                        />
                      </Link>
                    </div>
                    <div className="w-3/5 p-2 bg-white rounded-r-md">
                      <Link href={`/properties?modal=yes&id=${marker.id}`}>
                        <h3 className="text-md font-bold text-blue-600">{marker.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-1">{marker.adress}</p>
                      
                      {/* Button for the link */}
                      <Link href={marker.link}>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          variant="outline"
                          w="full"
                          mt={2}
                        >
                          View 
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Popup>
                {/* Custom label for the marker */}
                <div className="absolute" style={{ 
                  left: '50%', 
                  bottom: '100%', 
                  transform: 'translateX(-50%) translateY(-5px)', 
                  background: 'white', 
                  padding: '2px 5px', 
                  borderRadius: '4px', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }}>
                  {marker.label}
                </div>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Box>
    </Box>
  );
}
