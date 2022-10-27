import GrayBorderBox from '@/components/GrayBorderBox';
import { db } from '@/firebase/init';
import { Crop, cropFromDoc } from '@/types/crop';
import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { collection, DocumentData, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CropsData: NextPage = () => {
  const [cropsList, setCropsList] = useState<Crop[]>([]);

  const fetchCropsList = async (): Promise<Crop[]> => {
    let _cropsList: Crop[] = [];
    const _cropsCollectionRef = collection(db, 'cropsData');
    const _cropsQuery = query(_cropsCollectionRef);
    const _cropsSnapshot: QuerySnapshot<DocumentData> = await getDocs(_cropsQuery);
    _cropsSnapshot.forEach((doc) => {
      _cropsList.push(cropFromDoc(doc));
    });
    return _cropsList;
  };

  useEffect(() => {
    (async () => {
      const _cropsList: Crop[] = await fetchCropsList();
      setCropsList(_cropsList);
    })();
  }, []);

  const _contentsList: JSX.Element[] = cropsList.map((crop: Crop) => {
    return (
      <Tr key={crop.cropId} _hover={{ bg: 'gray.100' }}>
        <Td>{crop.cropId}</Td>
        <Td>{crop.name}</Td>
        <Td>{crop.ph[0] + ' - ' + crop.ph[1]}</Td>
        <Td>{crop.ec[0] + ' - ' + crop.ec[1]}</Td>
        <Td>{crop.n[0] + ' - ' + crop.n[1]}</Td>
        <Td>{crop.p[0] + ' - ' + crop.p[1]}</Td>
        <Td>{crop.k}</Td>
      </Tr>
    );
  });
  const headersList: string[] = ['ID', '作物名', 'PH', 'EC', 'N', 'P', 'K'];
  return (
    <Flex w="full" direction="column" px="16">
      <Flex direction="column" justifyContent="end" w="full" py="8">
        <Text fontSize="4xl" fontWeight="700" color="gray.800">
          固定値リスト
        </Text>
        <Text fontSize="sm" color="gray.400">
          固定値の追加や編集、削除ができます
        </Text>
      </Flex>
      <TableComponent headersList={headersList} contentsList={_contentsList} />
    </Flex>
  );
};

interface TableType {
  headersList: string[];
  contentsList: JSX.Element[];
}

const TableComponent = ({ headersList, contentsList }: TableType) => {
  const _headersList: JSX.Element[] = headersList.map((str: string) => {
    return <Th key={str}>{str}</Th>;
  });

  return (
    <Flex direction="column" w="full" pb="32">
      <GrayBorderBox>
        <Table w="full" colorScheme="gray">
          <Thead bg="gray.200">
            <Tr>{_headersList}</Tr>
          </Thead>
          <Tbody fontSize="sm" fontWeight="400">
            {contentsList}
          </Tbody>
        </Table>
      </GrayBorderBox>
    </Flex>
  );
};

export default CropsData;
