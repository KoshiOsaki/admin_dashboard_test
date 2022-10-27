import { cropsDataState } from '@/store/cropsDataState';
import { dataListState } from '@/store/dataListState';
import { fieldListState } from '@/store/fieldListState';
import { tagNameListState } from '@/store/tagNameListState';
import { Crop, cropFromDoc } from '@/types/crop';
import { dataFromDoc, TagData } from '@/types/data';
import { Field, fieldFromDoc } from '@/types/field';
import { Tag, tagFromDoc } from '@/types/tag';
import { Box, Flex } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { db } from 'src/firebase/init';
import { DataGraphBox } from './DataGraphBox';
import { DataListBox } from './DataListBox';

export const Data = () => {
  const router = useRouter();
  const userId = router.asPath.split('/')[2];

  const [dataList, setDataList] = useRecoilState<TagData[]>(dataListState);
  const [tagNameList, setTagNameList] = useRecoilState<Tag[]>(tagNameListState);
  const [cropsData, setCropsData] = useRecoilState<Crop[]>(cropsDataState);
  const [fieldList, setFieldList] = useRecoilState<Field[]>(fieldListState);

  const fetchDataList = async () => {
    const _dataList: TagData[] = [];
    const dataCollection = collection(db, 'users', userId, 'data');
    const dataQuery = query(dataCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(dataQuery);
    querySnapshot.forEach((doc) => {
      const _data = dataFromDoc(doc);
      _dataList.push(_data);
    });
    setDataList(_dataList);
  };

  const fetchTagList = async () => {
    const _tagsList: Tag[] = [];
    const tagCollection = collection(db, 'users', userId, 'tags');
    const tagQuery = query(tagCollection);
    const querySnapshot = await getDocs(tagQuery);
    querySnapshot.forEach((doc) => {
      const _tag = tagFromDoc(doc);
      _tagsList.push(_tag);
    });
    setTagNameList(_tagsList);
  };

  const fetchCropsList = async () => {
    const _cropsList: Crop[] = [];
    const cropsCollectionRef = collection(db, 'cropsData');
    const cropsQuery = query(cropsCollectionRef);
    const cropsSnapshot = await getDocs(cropsQuery);
    cropsSnapshot.forEach((doc) => {
      _cropsList.push(cropFromDoc(doc));
    });
    setCropsData(_cropsList);
  };

  const fetchfieldList = async () => {
    const _fieldList: Field[] = [];
    const fieldCollectionRef = collection(db, 'users', userId, 'fields');
    const fieldQuery = query(fieldCollectionRef);
    const fieldSnapshot = await getDocs(fieldQuery);
    fieldSnapshot.forEach((doc) => {
      _fieldList.push(fieldFromDoc(doc));
    });
    setFieldList(_fieldList);
  };

  //データリスト取得、随時更新にする
  useEffect(() => {
    (async () => {
      const _dataList: TagData[] = [];
      const dataCollection = collection(db, 'users', userId, 'data');
      const dataQuery = query(dataCollection, orderBy('createdAt', 'desc'));
      // const messageSubscription = onSnapshot(messageQuery, (querySnapshot) => {
      //   let _messageList: Message[] = [];
      //   querySnapshot.forEach((doc) => {
      //     _messageList.push(messageFromDoc(doc));
      //   });
      //   setMessageList(_messageList);
      // });
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        const _data = dataFromDoc(doc);
        _dataList.push(_data);
      });
      setDataList(_dataList);
    })();
  }, []);

  useEffect(() => {
    fetchDataList();
    fetchTagList();
    fetchCropsList();
    fetchfieldList();
  }, []);

  return (
    <Box mb="20">
      <Flex direction="column" w="full" px="8">
        <DataListBox />
        <DataGraphBox />
      </Flex>
    </Box>
  );
};
