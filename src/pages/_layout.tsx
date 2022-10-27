import Sidebar from '@/components/sidebar';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  LinkProps,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const HoverLink = (props: LinkProps) => <Link rounded="base" _hover={{ bg: 'gray.200' }} p={2} {...props} />;

const Navigation = () => {
  return (
    <Stack as="nav">
      <HoverLink>ホーム</HoverLink>
      <HoverLink>ユーザー</HoverLink>
    </Stack>
  );
};

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Navigation />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const Layout = ({ children }: { children: any }) => {
  return (
    <Flex direction="column" bg="white" w="100vw" h="100vh">
      <Box display={{ base: 'block', md: 'none' }}>
        <DrawerMenu />
      </Box>
      <Flex w="100vw" h="100vh">
        <Sidebar />
        <Flex w="full" justifyContent="center">
          <Flex w="full" maxWidth="1600px" ml={{ base: '0', md: '48' }}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
