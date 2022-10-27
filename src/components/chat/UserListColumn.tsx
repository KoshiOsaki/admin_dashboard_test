import { db } from '@/firebase/init';
import { selectedUserState } from '@/store/selectedUserState';
import { Message, messageFromDoc, reformToDate } from '@/types/message';
import { User } from '@/types/user';
import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  user: User;
}

export const UserListColumn = ({ user }: Props) => {
  const [selectedUser, setSelectedUser] = useRecoilState<User>(selectedUserState);
  const [lastMessage, setLastMessage] = useState<Message>();
  const lastDate = lastMessage && reformToDate(lastMessage.createdAt);

  useEffect(() => {
    let _lastMessage: Message;
    const _messageList: Message[] = [];
    const messageCollection = collection(db, 'users', user.userId, 'chats');
    const messageQuery = query(messageCollection, orderBy('createdAt'));
    const messageSubscription = onSnapshot(messageQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        _messageList.push(messageFromDoc(doc));
      });
      _lastMessage = _messageList.pop() as Message;
      setLastMessage(_lastMessage);
    });
  }, []);

  const onClickSelect = () => {
    setSelectedUser(user);
  };

  return (
    <Box
      _hover={selectedUser.userId == user.userId ? {} : { bgColor: 'gray.200' }}
      p="3"
      onClick={onClickSelect}
      bgColor={selectedUser.userId == user.userId ? 'blue.100' : ''}
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Avatar name={user.userName} />
          {lastMessage?.isMe == true && lastMessage.unread == true && <Box fontSize="sm" w="15px" h="15px" bgColor="red.400" rounded="full" />}
          <Box>
            <Text fontWeight="bold">{user.userName}</Text>
            <Text fontSize="sm" color="gray.500" textAlign="left">
              {lastMessage && lastMessage.text}
            </Text>
          </Box>
        </HStack>
        <Stack>
          <Text fontSize="sm" fontWeight="semibold" color="gray.500" ml="auto">
            {lastDate && `${lastDate.month}/${lastDate.day}`}
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
};
