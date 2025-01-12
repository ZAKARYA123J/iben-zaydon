import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Grid,
  GridItem,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaBed, FaChevronDown, FaBath, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/router';

const citiesInMorocco = [
  "All Ville", "Agadir", "Aïn Harrouda", "Ben Yakhlef", "Bouskoura", "Casablanca", "Médiouna", "Mohammadia", "Tit Mellil", "Bejaad", "Ben Ahmed", "Benslimane", "Berrechid",
  "Boujniba", "Boulanouare", "Bouznika", "Deroua", "El Borouj", "El Gara", "Guisser", "Hattane", "Khouribga", "Loulad", "Oued Zem", "Oulad Abbou",
  "Oulad H'Riz Sahel", "Oulad M'rah", "Oulad Said", "Oulad Sidi Ben Daoud", "Ras El Ain", "Settat", "Sidi Rahhal Chataï", "Soualem", "Azemmour", "Bir Jdid",
  "El Jadida", "Hrara", "Ighoud", "Jamaat Shaim", "Jorf Lasfar", "Khemis Zemamra", "Laaounate", "Moulay Abdallah", "Oualidia", "Oulad Amrane", "Oulad Frej",
  "Oulad Ghadbane", "Safi", "Sebt El Maârif", "Sebt Gzoula", "Sidi Ahmed", "Sidi Ali Ban Hamdouche", "Sidi Bennour", "Sidi Bouzid", "Sidi Smaïl", "Youssoufia",
  "Fès", "Ain Cheggag", "Bhalil", "Boulemane", "El Menzel", "Guigou", "Imouzzer Kandar", "Imouzzer Marmoucha", "Missour", "Moulay Yaacoub", "Ouled Tayeb",
  "Ribate El Kheir", "Séfrou", "Skhinate", "Tafajight", "Arbaoua", "Ain Dorij", "Dar Gueddari", "Had Kourt", "Jorf El Melha", "Kénitra", "Khenichet",
  "Lalla Mimouna", "Mechra Bel Ksiri", "Mehdia", "Moulay Bousselham", "Sidi Allal Tazi", "Sidi Kacem", "Sidi Slimane", "Sidi Taibi", "Sidi Yahya El Gharb",
  "Souk El Arbaa", "Akka", "Assa", "Bouizakarne", "El Ouatia", "Es-Semara", "Fam El Hisn", "Foum Zguid", "Guelmim", "Taghjijt", "Tan-Tan", "Tata",
  "Zag", "Marrakech", "Ait Daoud", "Amizmiz", "Assahrij", "Ait Ourir", "Ben Guerir", "Chichaoua", "El Hanchane", "El Kelaâ des Sraghna", "Fraïta",
  "Ghmate", "Imintanoute", "Kattara", "Lalla Takerkoust", "Loudaya", "Laatataouia", "Moulay Brahim", "Mzouda", "Sid L'Mokhtar", "Sid Zouin", "Sidi Abdallah Ghiat",
  "Sidi Bou Othmane", "Sidi Rahhal", "Skhour Rehamna", "Smimou", "Tafetachte", "Tahannaout", "Talmest", "Tamallalt", "Tamanar", "Tamansourt", "Tameslouht",
  "Tanalt", "Meknes", "Khenifra", "Agourai", "Ain Taoujdate", "MyAliCherif", "Rissani", "Amalou Ighriben", "Aoufous", "Arfoud", "Azrou", "Ain Jemaa",
  "Ain Karma", "Ain Leuh", "Ait Boubidmane", "Ait Ishaq", "Boudnib", "Boumia", "El Hajeb", "Elkbab", "Er-Rich", "Errachidia", "Gardmit", "Goulmima",
  "Gourrama", "Had Bouhssoussen"
];

const PropertySearchPage = ({
  onTabChange,
  onPropertyTypeChange,
  properties = [],
  onCityChange,
  onRoomCountChange,
  onBathroomsCountChange,
  onSearchChange,
  searchDisplay,
  num,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('TOUS TYPE');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedCity, setSelectedCity] = useState('Select a city');
  const [cityInput, setCityInput] = useState('');
  const [roomselect, setroomselect] = useState('Tous chambre');
  const [Bathroomselect, setBathroomselect] = useState('Tous Salle de bain');
  const [searchInput, setSearchInput] = useState('');
  const [selectedRoomCount, setSelectedRoomCount] = useState('');
  const [selectedBathroomsCount, setSelectedBathroomsCount] = useState('');
  const inputRef = useRef(null);

  const updateUrlWithoutNavigation = (newParams) => {
    const url = new URL(window.location.href);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, '', url.toString());
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (typeof onTabChange === 'function') {
      onTabChange(tab);
    }
    updateUrlWithoutNavigation({ tab: tab.replace(/\s/g, '+') });
  };

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyType(type);
    if (typeof onPropertyTypeChange === 'function') {
      onPropertyTypeChange(type);
    }
    updateUrlWithoutNavigation({ propertyType: type.replace(/\s/g, '+') });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (typeof onCityChange === 'function') {
      onCityChange(city);
    }
    updateUrlWithoutNavigation({ city });
  };

  const handleRoomCountChange = (count) => {
    setSelectedRoomCount(count);
    setroomselect(count ? `${count} chambre${count > 1 ? 's' : ''}` : 'Tous chambre');
    if (typeof onRoomCountChange === 'function') {
      onRoomCountChange(count);
    }
    updateUrlWithoutNavigation({ roomCount: count });
  };

  const handleBathroomsCountChange = (count) => {
    setSelectedBathroomsCount(count);
    setBathroomselect(count ? `${count} Salle de bain${count > 1 ? 's' : ''}` : 'Tous Salle de bain');
    if (typeof onBathroomsCountChange === 'function') {
      onBathroomsCountChange(count);
    }
    updateUrlWithoutNavigation({ bathroomsCount: count });
  };

  const handleCitySearch = (event) => {
    setCityInput(event.target.value);
  };

  const getSearchUrl = () => {
    const queryParams = new URLSearchParams({
      tab: activeTab.replace(/\s/g, '+'),
      propertyType: selectedPropertyType.replace(/\s/g, '+'),
      city: selectedCity !== 'Select a city' ? selectedCity : '',
      roomCount: selectedRoomCount || '',
      bathroomsCount: selectedBathroomsCount || '',
    }).toString();

    return `/properties?${queryParams}`;
  };

  const handleSearch = () => {
    router.push(getSearchUrl());
  };

  const filteredCities = citiesInMorocco.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabFromUrl = queryParams.get('tab');
    const cityFromUrl = queryParams.get('city');
    const roomCountFromUrl = queryParams.get('roomCount');
    const bathroomsCountFromUrl = queryParams.get('bathroomsCount');
    const propertyTypeFromUrl = queryParams.get('propertyType');

    if (tabFromUrl) {
      const formattedTab = tabFromUrl.replace(/\+/g, ' ');
      setActiveTab(formattedTab);
      if (typeof onTabChange === 'function') {
        onTabChange(formattedTab);
      }
    }

    if (cityFromUrl) setSelectedCity(cityFromUrl);
    if (roomCountFromUrl) setSelectedRoomCount(roomCountFromUrl);
    if (bathroomsCountFromUrl) setSelectedBathroomsCount(bathroomsCountFromUrl);
    if (propertyTypeFromUrl) {
      const formattedPropertyType = propertyTypeFromUrl.replace(/\+/g, ' ');
      setSelectedPropertyType(formattedPropertyType);
      if (typeof onPropertyTypeChange === 'function') {
        onPropertyTypeChange(formattedPropertyType);
      }
    }
  }, [router.query, onTabChange, onPropertyTypeChange]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchDisplay === 'block') {
        onSearchChange(searchInput);
      }
    }, 100);
    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, onSearchChange, searchDisplay]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box>
    
    </Box>
  );
};

export default PropertySearchPage;