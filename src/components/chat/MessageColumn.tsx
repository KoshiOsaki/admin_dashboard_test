import { db } from '@/firebase/init';
import { selectedUserState } from '@/store/selectedUserState';
import { Message, reformToDate } from '@/types/message';
import { User } from '@/types/user';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, HStack, IconButton, Spacer, Text } from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  message: Message;
}

export const MessageColumn = ({ message }: Props) => {
  const [selectedUser, setSelectedUser] = useRecoilState<User>(selectedUserState);
  const [hoverIsEditing, setHoverIsEditing] = useState(false);
  const date = reformToDate(message.createdAt);
  const onClickDelete = async () => {
    await deleteDoc(doc(db, 'users', selectedUser.userId, 'chats', message.id));
  };

  const hoverChangeEditing = (bool: boolean) => {
    bool ? setHoverIsEditing(true) : setHoverIsEditing(false);
  };

  return (
    <>
      {message.isMe ? (
        <Box w="full">
          <HStack>
            <Avatar name={selectedUser.userName} />
            <Box>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >{`${date.month}/${date.day}(${date.dayOfWeek})${date.hour}:${date.minute}`}</Text>
              <Box roundedBottom="3xl" roundedTopRight="3xl" bgColor="gray.100" border="1px" borderColor="gray.300" py="2" px="3" d="inline-block">
                <Text textColor="gray.700">{message.text}</Text>
              </Box>
            </Box>
          </HStack>
        </Box>
      ) : (
        <Flex w="full" textAlign="right" justifyContent="space-between">
          <Spacer />
          <HStack>
            <Box onMouseOver={() => hoverChangeEditing(true)} onMouseLeave={() => hoverChangeEditing(false)}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
                ml="auto"
              >{`${date.month}/${date.day}(${date.dayOfWeek})${date.hour}:${date.minute}`}</Text>
              {hoverIsEditing && (
                <>
                  <IconButton aria-label="delete" colorScheme="red" icon={<DeleteIcon />} isRound={true} size="sm" mx="1" onClick={onClickDelete} />
                  <IconButton aria-label="edit" colorScheme="yellow" icon={<EditIcon />} isRound={true} size="sm" mx="1" />
                </>
              )}
              <Box roundedBottomLeft="3xl" roundedBottomRight="3xl" roundedTopLeft="3xl" bgColor="blue.100" py="2" px="3" d="inline-block">
                <Text textColor="gray.700">{message.text}</Text>
              </Box>
            </Box>
            <Avatar />
          </HStack>
        </Flex>
      )}
    </>
  );
};
