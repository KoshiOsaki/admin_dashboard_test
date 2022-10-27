import Alerts from '@/components/users/alerts';
import { Data } from '@/components/users/data/Data';
import Fields from '@/components/users/fields';
import Memos from '@/components/users/memos';
import Tags from '@/components/users/tags';
import { db } from '@/firebase/init';
import { User, userFromDoc } from '@/types/user';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { collection, doc, DocumentData, getDoc, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { NextPage } from 'next';

// TODO: 正直あらかじめPathを作っておくことがパフォーマンス的に良いのかはわからない

export const getStaticPaths = async () => {
  const usersList: User[] = [];
  const usersCollection = collection(db, 'users');
  const usersQuery = query(usersCollection);
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(usersQuery);
  querySnapshot.forEach((doc) => {
    usersList.push(userFromDoc(doc));
  });

  const paths = usersList.map((user: User) => ({
    params: {
      userId: user.userId,
    },
  }));
  return { paths, fallback: 'blocking' };
};

interface Params {
  params: {
    userId: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const userDocRef = doc(db, 'users', params.userId);
  const userDocData = await getDoc(userDocRef);
  // 作成されていないPathなら404へリダイレクト
  if (!userDocData.exists()) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const user: User = userFromDoc(userDocData);
  return {
    props: {
      user: user,
    },
  };
};

interface Props {
  user: User;
}

const User: NextPage<Props> = ({ ...props }: Props) => {
  const _tabsList: string[] = ['データ', '畑', 'タグ', 'メモ', 'アラート'];
  // TODO: _tabsの方が良い
  const tabs = _tabsList.map((tab: string) => {
    return (
      <Tab key={tab} fontSize="lg" fontWeight="600" color="gray.500" mx="2">
        {tab}
      </Tab>
    );
  });

  return (
    <Flex direction="column" w="full" h="full">
      <UsersHeader user={props.user} />
      <Tabs colorScheme="teal">
        <TabList bg="gray.50">{tabs}</TabList>
        <TabPanels pt="8">
          <TabPanel>
            <Data />
          </TabPanel>

          <TabPanel>
            <Fields />
          </TabPanel>

          <TabPanel>
            <Tags />
          </TabPanel>

          <TabPanel>
            <Memos />
          </TabPanel>

          <TabPanel>
            <Alerts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const UsersHeader = ({ user }: { user: User }) => {
  return (
    <Flex direction="column" px="4" justifyContent="end" w="full" h="40" bg="gray.50">
      <Text fontSize="4xl" fontWeight="700" color="gray.800">
        {user.userName} さんのデータ
      </Text>
      <Text fontSize="sm" mb="4" color="gray.400">
        {user.email}
      </Text>
    </Flex>
  );
};

export default User;
