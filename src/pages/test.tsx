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
  HStack,
  Link,
  LinkProps,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';

const HoverLink = (props: LinkProps) => <Link rounded="base" _hover={{ bg: 'gray.200' }} p={2} {...props} />;

const Navigation = () => {
  return (
    <Stack as="nav">
      <HoverLink>Burger</HoverLink>
      <HoverLink>Sidemenu</HoverLink>
      <HoverLink>Drink</HoverLink>
      <HoverLink>Takeout</HoverLink>
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

const LayoutWithMenu: FC<{}> = ({ children }) => {
  return (
    <Stack>
      <HStack p={5}>
        <Box display={{ base: 'block', md: 'none' }}>
          <DrawerMenu />
        </Box>
        {/* <Heading>Humberger Shop</Heading> */}
      </HStack>
      <HStack alignItems="start">
        <Box display={{ base: 'none', md: 'block' }} w={500} px={6}>
          <Navigation />
        </Box>
        <Box>{children}</Box>
      </HStack>
    </Stack>
  );
};

const Page = () => {
  return (
    <LayoutWithMenu>
      <Box>
        Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger Humburger
        Humburger Humburger Humburger Humburger
      </Box>
      {/* {messageList[messageList.length - 1].unread && (
        <>
          <Text textAlign="center">New</Text>
          <Divider borderColor="blackAlpha.400" />
        </>
      )} */}
    </LayoutWithMenu>
  );
};

Page.containerSize = 'fill';

export default Page;
