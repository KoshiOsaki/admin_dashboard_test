import { userListState } from '@/store/userListState';
import { User } from '@/types/user';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { UserListColumn } from './UserListColumn';

export const ChatUserList = () => {
  const [userList, setUserList] = useRecoilState<User[]>(userListState);

  return (
    <>
      <Box borderTopRadius="lg" p="4" borderBottom="1px" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold">
          ユーザーリスト
        </Text>
      </Box>
      <Flex direction="column">
        {userList.map((user: User, index) => (
          <UserListColumn key={index} user={user} />
        ))}
      </Flex>
    </>
  );
};
