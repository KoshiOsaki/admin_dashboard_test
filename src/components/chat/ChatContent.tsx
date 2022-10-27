import { MessageColumn } from '@/components/chat/MessageColumn';
import { db } from '@/firebase/init';
import { messageListState } from '@/store/messageListState';
import { selectedUserState } from '@/store/selectedUserState';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { AttachmentIcon, InfoOutlineIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useRecoilState } from 'recoil';

export const ChatContent = () => {
  const [messageList, setMessageList] = useRecoilState<Message[]>(messageListState);
  const [selectedUser, setSelectedUser] = useRecoilState<User>(selectedUserState);
  const [newMessage, setNewMessage] = useState<string>('');
  const onChangeMessage = (e: any) => {
    setNewMessage(e.target.value);
  };
  //送信後最新メッセージまでスクロールさせなきゃ
  const onClickAdd = async () => {
    const now: Date = new Date();
    const createdAt: Timestamp = Timestamp.fromDate(now);
    if (newMessage !== '') {
      const ob = {
        isMe: false,
        text: newMessage,
        unread: false,
        createdAt: new Date(createdAt.seconds * 1000),
      };
      await addDoc(collection(db, 'users', selectedUser.userId, 'chats'), ob);
      setNewMessage('');
    } else {
      alert('メッセージを入力してください');
    }
  };
  return (
    <>
      <Flex justifyContent="space-between" bgColor="teal" borderTopRadius="3xl" p="4" textColor="white">
        <Text fontSize="lg" fontWeight="bold">
          {selectedUser.userName}
        </Text>
        <Flex align="center">
          <StarIcon mx={3} />
          <InfoOutlineIcon mx={3} />
        </Flex>
      </Flex>

      <Stack p="3">
        {selectedUser.userId == '' ? (
          <Box h="600px">
            <Center h="100%" fontSize="lg">
              ユーザーを選択してください。
            </Center>
          </Box>
        ) : (
          //少し工夫して未読にマークする
          <div style={{ height: '600px', overflow: 'scroll' }}>
            {messageList.map((message: Message, index) => {
              if (!message.unread) {
                return <MessageColumn key={index} message={message} />;
              }
            })}
            {messageList.map((message: Message, index) => {
              if (message.unread) {
                return <MessageColumn key={index} message={message} />;
              }
            })}
          </div>
        )}

        <Flex>
          <IconButton aria-label="Attach" icon={<AttachmentIcon />} />
          <Input value={newMessage} onChange={onChangeMessage} mx="1" />
          <IconButton onClick={onClickAdd} variant="outline" colorScheme="teal" aria-label="Call Sage" fontSize="20px" icon={<MdSend />} />
        </Flex>
      </Stack>
    </>
  );
};
