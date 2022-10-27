import { db } from '@/firebase/init';
import { Tag, tagFromDoc } from '@/types/tag';
import { Flex, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GrayBorderBox from '../GrayBorderBox';

const Tags: NextPage = () => {
  const [tagNameList, setTagNameList] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const _tagsList: Tag[] = [];
      const userId = router.asPath.split('/')[2];
      const tagCollection = collection(db, 'users', userId, 'tags');
      const tagQuery = query(tagCollection);
      const querySnapshot = await getDocs(tagQuery);
      querySnapshot.forEach((doc) => {
        const _tag = tagFromDoc(doc);
        _tagsList.push(_tag);
      });
      setTagNameList(_tagsList);
    })();
  }, []);

  const tagTypeList = ['ID', '名前', '畑ID'];

  const _tableHeaderList: JSX.Element[] = tagTypeList.map((str: string) => {
    return <Th key={str}>{str}</Th>;
  });

  const _tableColumnList: JSX.Element[] = tagNameList.map((tag: Tag) => {
    return (
      <Tr key={tag.tagId}>
        <Td _hover={{ bg: 'gray.100' }}>{tag.tagId}</Td>
        <Td _hover={{ bg: 'gray.100' }}>{tag.tagName}</Td>
        <Td _hover={{ bg: 'gray.100' }}>{tag.fieldId}</Td>
      </Tr>
    );
  });
  return (
    <Flex direction="column" w="full" px="8">
      <GrayBorderBox>
        <Table>
          <Tbody>
            <Tr bgColor={'gray.200'}>{_tableHeaderList}</Tr>
            {_tableColumnList}
          </Tbody>
        </Table>
      </GrayBorderBox>
    </Flex>
  );
};

export default Tags;
