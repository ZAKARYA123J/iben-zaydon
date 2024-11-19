import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Center,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import Link from 'next/link';
import Image from "next/image";
// import siteInfo from "../../types/CmsSingleTypes/siteInformation";
// import { MdOutlineArrowOutward } from "react-icons/md";

const Naavbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="white"
      position="sticky"
      top={0}
      zIndex={50}
      w="full"
      borderBottom="1px"
      borderColor="white"
    >
      <Flex
        h="5rem"
        maxW="6xl"
        mx="auto"
        align="center"
        justify="space-between"
        px={6}
        py={2}
      >
        <Link
          href="/Index"
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="lg"
          fontWeight="bold"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          <Image
            src="/images/logoo.png"
            alt="Immocean"
            width={200}          // Set a numeric width for aspect ratio
            height={40}         // Set a numeric height for aspect ratio
          />
        </Link>
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={12}
          fontWeight="bold"
        >
          <NavLink href="/Index">Accueil</NavLink>
          <NavLink href="/properties">Propriétés</NavLink>
          <NavLink href="/service">Services</NavLink>
          <NavLink href="/about">A propos de</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Button
            display={{ base: "none", md: "none", lg: "flex" }}
            position="relative"
            padding="12px 35px"
            bg="blue.600"
            fontSize="17px"
            fontWeight="500"
            color="white"
            border="3px solid  #1E88E5"
            borderRadius="8px"
            transition="all 0.3s ease-in-out"
            cursor="pointer"
            _hover={{
              bg: "transparent",
              color: "blue.600",
              boxShadow: "0 0 25px  #1E88E5",
            }}
          >
            Commencer
          </Button>
          <IconButton
            aria-label="Toggle navigation"
            icon={<HamburgerIcon />}
            size="lg"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            bg="white"
          />
          <Drawer isOpen={isOpen} onClose={onClose} placement="right" bg="white">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <Flex direction="column" fontWeight="bold" gap={4}>
                  <NavLink href="/Index">Accueil</NavLink>
                  <NavLink href="/properties">Propriétés</NavLink>
                  <NavLink href="/about">A propos de</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                  <Button
                    position="relative"
                    padding="12px 35px"
                    bg="blue.600"
                    size="sm"
                    href="/properties"
                    fontSize="17px"
                    fontWeight="500"
                    color="white"
                    border="3px solid  #1E88E5"
                    borderRadius="8px"
                    transition="all 0.3s ease-in-out"
                    cursor="pointer"
                    _hover={{
                      bg: "transparent",
                      color: "blue.600",
                      boxShadow: "0 0 25px  #1E88E5",
                    }}
                  >
                    Commencer
                  </Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Naavbar;

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      fontWeight="bold"
      fontSize="md"
      transition="color 0.2s"
      _hover={{ color: "blue.600" }}
    >
      {children}
    </Link>
  );
}
