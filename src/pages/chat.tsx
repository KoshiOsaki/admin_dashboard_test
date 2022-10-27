import { ChatContent } from '@/components/chat/ChatContent';
import { ChatUserList } from '@/components/chat/ChatUserList';
import { db } from '@/firebase/init';
import { messageListState } from '@/store/messageListState';
import { selectedUserState } from '@/store/selectedUserState';
import { userListState } from '@/store/userListState';
import { Message, messageFromDoc } from '@/types/message';
import { User, userFromDoc } from '@/types/user';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const getStaticProps = async () => {
  const _userList: User[] = [];
  const userCollection = collection(db, 'users');
  const userQuery = query(userCollection, limit(10));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(userQuery);
  querySnapshot.forEach((doc) => {
    _userList.push(userFromDoc(doc));
  });
  return {
    props: {
      _userList,
    },
  };
};

interface Props {
  _userList: User[];
}

const Chat: NextPage<Props> = ({ _userList }: Props) => {
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [userList, setUserList] = useRecoilState(userListState);

  //このセットのタイミングは正しい？
  useEffect(() => {
    setUserList(_userList);
  }, []);

  useEffect(() => {
    if (selectedUser.userId !== '') {
      const messageCollection = collection(db, 'users', selectedUser.userId, 'chats');
      const messageQuery = query(messageCollection, orderBy('createdAt'));
      const messageSubscription = onSnapshot(messageQuery, (querySnapshot) => {
        let _messageList: Message[] = [];
        querySnapshot.forEach((doc) => {
          _messageList.push(messageFromDoc(doc));
        });
        setMessageList(_messageList);
      });
    }
  }, [selectedUser]);

  // メッセージ取得時に未読のメッセージを全て既読にする
  useEffect(() => {
    messageList.forEach(async (message: Message) => {
      if (message.unread) {
        await updateMessageToRead(message);
      }
    });
  }, [messageList]);
  const updateMessageToRead = async (message: Message) => {
    const messageDoc: DocumentReference<DocumentData> = doc(db, 'users', selectedUser.userId, 'chats', message.id);
    const messageData = {
      unread: false,
    };
    await updateDoc(messageDoc, messageData);
  };

  return (
    <>
      <Flex w="full" direction="column" px="16">
        <Flex direction="column" justifyContent="end" w="full" py="8">
          <Text fontSize="4xl" fontWeight="700" color="gray.800">
            チャット
          </Text>
          <Text fontSize="sm" color="gray.400">
            ユーザーとチャットができます
          </Text>
        </Flex>
        <Stack direction="row" spacing="10" pb="20">
          <Box boxShadow="xl" borderRadius="lg" border="1px" borderColor="gray.200" w="40%">
            <ChatUserList />
          </Box>
          <Box w="60%" boxShadow="xl" borderRadius="3xl" border="1px" borderColor="gray.200">
            <ChatContent />
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Chat;
