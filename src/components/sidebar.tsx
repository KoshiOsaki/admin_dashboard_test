import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pages } from 'src/types/page';

const Sidebar = () => {
  const router = useRouter();
  return (
    <Flex pos="fixed" display={{ base: 'none', md: 'block' }} w={48} h="100vh" borderRight="1px" borderColor="gray.300" bg="white">
      <LogoBox />
      {pages.map((page) => {
        return <NavBox key={page.text} selected={page.route == router.pathname} text={page.text} route={page.route} />;
      })}
    </Flex>
  );
};

const LogoBox = () => {
  return (
    <Link href={'/'}>
      <Flex w="full" h="64px" alignItems="center" my="4" cursor="pointer">
        <Image src="./images/logo.png" alt="logo" w="104px" />
      </Flex>
    </Link>
  );
};

const NavBox = ({ selected, text, route }: { selected: boolean; text: string; route: string }) => {
  return (
    <Link href={route}>
      <Flex
        h="48px"
        px="4"
        alignItems="center"
        role="group"
        cursor="pointer"
        bg={selected ? 'teal' : 'white'}
        color={selected ? 'white' : 'gray.500'}
        _hover={{
          bg: selected ? 'teal.400' : 'gray.100',
        }}
      >
        {text}
      </Flex>
    </Link>
  );
};

export default Sidebar;
