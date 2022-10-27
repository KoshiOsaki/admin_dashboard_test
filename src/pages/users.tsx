import GrayBorderBox from '@/components/GrayBorderBox';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { collection, DocumentData, getDocs, limit, query, QuerySnapshot } from 'firebase/firestore';
import { NextPage } from 'next';
import Link from 'next/link';
import { db } from 'src/firebase/init';
import { User, userFromDoc } from 'src/types/user';

export const getStaticProps = async () => {
  const usersList: User[] = [];
  const usersCollection = collection(db, 'users');
  const usersQuery = query(usersCollection, limit(10));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(usersQuery);
  querySnapshot.forEach((doc) => {
    usersList.push(userFromDoc(doc));
  });
  return {
    props: {
      usersList,
    },
  };
};

interface Props {
  usersList: User[];
}

const Users: NextPage<Props> = ({ ...props }: Props) => {
  return (
    <Flex w="full" direction="column" px="16">
      <Flex direction="column" justifyContent="end" w="full" py="8">
        <Text fontSize="4xl" fontWeight="700" color="gray.800">
          ユーザーリスト
        </Text>
        <Text fontSize="sm" color="gray.400">
          ユーザーの追加や編集、削除ができます
        </Text>
      </Flex>

      <UsersBox usersList={props.usersList} />
    </Flex>
  );
};

const UsersBox = (props: { usersList: User[] }) => {
  // TODO: compではなく、_userColumnCompなどにした方が良い
  const comp: JSX.Element[] = [];
  props.usersList.forEach((user: User) => {
    comp.push(
      <Link href={`/users/${user.userId}`}>
        <Flex
          w="full"
          p={4}
          borderBottom="1px"
          borderColor="gray.200"
          _hover={{
            bg: 'gray.100',
          }}
          cursor="pointer"
        >
          <Avatar name={user.userName} />
          <Box ml="3">
            <Text fontWeight="bold">{user.userName}</Text>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
        </Flex>
      </Link>,
    );
  });
  return (
    <GrayBorderBox>
      <Flex direction="column">{comp}</Flex>
    </GrayBorderBox>
  );
};

export default Users;
