import { db } from '@/firebase/init';
import { TagData } from '@/types/data';
import { reformToDate } from '@/types/message';
import { Box, Button, Input, Td, Tr } from '@chakra-ui/react';
import { deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  data: TagData;
  isEditing: boolean;
  updateFlag: number;
}

export const DataRaw = ({ data, isEditing, updateFlag }: Props) => {
  const router = useRouter();
  const userId = router.asPath.split('/')[2];
  const [editTagData, setEditTagData] = useState<TagData>(data);
  const date = reformToDate(data.createdAt);

  const onClickDelete = async () => {
    data.dataId && (await deleteDoc(doc(db, 'users', userId, 'data', data.dataId)));
    location.reload();
  };

  useEffect(() => {
    const dataUpdate = async () => {
      const now: Date = new Date();
      const createdAt: Timestamp = Timestamp.fromDate(now);
      //バリデーションどうにかする
      if (Text !== undefined) {
        const ob = {
          ...editTagData,
          createdAt: new Date(createdAt.seconds * 1000),
          tagId: data.tagId,
        };
        data.dataId && (await updateDoc(doc(db, 'users', userId, 'data', data.dataId), ob));
        console.log('update', ob);
      }
    };
  }, [updateFlag]);

  const onChangeData = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditTagData({ ...editTagData, [name]: value });
  };

  //mapでやる
  return (
    <Tr>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input value={data.ph} name="ph" onChange={onChangeData} width="4em" focusBorderColor="none" _hover={{ bg: 'none' }} border="none" />
        ) : (
          <Box w="4em">{data.ph}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input
            value={data.temperature}
            name="temperature"
            onChange={onChangeData}
            width="4em"
            focusBorderColor="none"
            _hover={{ bg: 'none' }}
            border="none"
          />
        ) : (
          <Box w="4em">{data.temperature}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input
            value={data.humidity}
            name="humidity"
            onChange={onChangeData}
            width="4em"
            focusBorderColor="none"
            _hover={{ bg: 'none' }}
            border="none"
          />
        ) : (
          <Box w="4em">{data.humidity}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input value={editTagData.ec} name="ec" onChange={onChangeData} width="4em" focusBorderColor="none" _hover={{ bg: 'none' }} border="none" />
        ) : (
          <Box w="4em">{data.ec}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input value={editTagData.n} name="n" onChange={onChangeData} width="4em" focusBorderColor="none" _hover={{ bg: 'none' }} border="none" />
        ) : (
          <Box w="4em">{data.n}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input value={data.p} name="p" onChange={onChangeData} width="4em" focusBorderColor="none" _hover={{ bg: 'none' }} border="none" />
        ) : (
          <Box w="4em">{data.p}</Box>
        )}
      </Td>
      <Td _hover={{ bg: 'gray.100' }}>
        {isEditing ? (
          <Input value={data.k} name="k" onChange={onChangeData} width="4em" focusBorderColor="none" _hover={{ bg: 'none' }} border="none" />
        ) : (
          <Box w="4em">{data.k}</Box>
        )}
      </Td>
      <Td>{data.tagId}</Td>
      <Td>{`${date.month}/${date.day} ${date.hour}:${date.minute}`}</Td>
      <Td>
        {isEditing && (
          <Button onClick={onClickDelete} bg="red.400" _hover={{ bg: 'red.500' }} textColor="white">
            削除
          </Button>
        )}
      </Td>
    </Tr>
  );
};
