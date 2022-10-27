import { db } from '@/firebase/init';
import { Field, fieldFromDoc } from '@/types/field';
import { Flex, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GrayBorderBox from '../GrayBorderBox';

const Fields: NextPage = () => {
  const [fieldsList, setFieldsList] = useState<Field[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const _fieldsList: Field[] = [];
      const userId = router.asPath.split('/')[2];
      const fieldCollection = collection(db, 'users', userId, 'fields');
      const fieldQuery = query(fieldCollection);
      const querySnapshot = await getDocs(fieldQuery);
      querySnapshot.forEach((doc) => {
        const _field = fieldFromDoc(doc);
        _fieldsList.push(_field);
      });
      setFieldsList(_fieldsList);
    })();
  }, []);

  const fieldTypeList = ['ID', '名前', '作物ID'];

  const _tableHeaderList: JSX.Element[] = fieldTypeList.map((str: string) => {
    return <Th key={str}>{str}</Th>;
  });

  const _tableColumnList: JSX.Element[] = fieldsList.map((field: Field) => {
    return (
      <Tr key={field.fieldId}>
        <Td _hover={{ bg: 'gray.100' }}>{field.fieldId}</Td>
        <Td _hover={{ bg: 'gray.100' }}>{field.fieldName}</Td>
        <Td _hover={{ bg: 'gray.100' }}>{field.cropId}</Td>
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

export default Fields;
