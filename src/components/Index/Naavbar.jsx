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
