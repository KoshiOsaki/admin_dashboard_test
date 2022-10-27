import { db } from '@/firebase/init';
import { dataListState } from '@/store/dataListState';
import { tagListForTableState } from '@/store/tagListForTableState';
import { tagNameListState } from '@/store/tagNameListState';
import { TagChecked, TagData, TagDataItem, tagDataItems } from '@/types/data';
import { Tag } from '@/types/tag';
import { Box, Button, Flex, Input, Table, Tbody, Td, Text, Th, Tr } from '@chakra-ui/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { DataRaw } from './DataRaw';
import { TopSelecter } from './TopSelecter';

export const DataListBox = () => {
  const router = useRouter();
  const userId = router.asPath.split('/')[2];
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [dataList, setDataList] = useRecoilState<TagData[]>(dataListState);
  const [tagList, setTagList] = useRecoilState<TagChecked[]>(tagListForTableState);
  const [tagNameList, setTagNameList] = useRecoilState<Tag[]>(tagNameListState);
  const [checkedDataList, setCheckedDataList] = useState<TagData[]>([]);
  const [newTagData, setNewTagData] = useState<TagData>({
    tagId: 0,
    ph: 0,
    temperature: 0,
    humidity: 0,
    ec: 0,
    n: 0,
    p: 0,
    k: 0,
    createdAt: new Date(),
  });
  const [updateFlag, setUpdateFlag] = useState(0); //仮

  //要改善
  const dt1 = new Date();
  const dt2 = new Date();
  dt2.setDate(dt2.getDate() - 2);
  const [to, setTo] = useState<string>(dt1.toISOString().split('T')[0]);
  const [from, setFrom] = useState<string>(dt2.toISOString().split('T')[0]);
  const { register, handleSubmit } = useForm();

  //タグIDソート用の、データの存在するタグIDのリストをつくる。上のリストとグラフで別にした。重複削除と、tagNameをあててる
  useEffect(() => {
    if (dataList) {
      let _tagList: TagChecked[] = [];
      dataList.map((data) => {
        _tagList.push({ tag: { tagId: data.tagId, tagName: '', fieldId: '' }, checked: true });
      });
      _tagList = _tagList.filter((tag, index) => _tagList.findIndex((e) => e.tag.tagId == tag.tag.tagId) === index);
      _tagList = _tagList.map((tag) => ({
        tag: { tagId: tag.tag.tagId, fieldId: '', tagName: tagNameList.find((tagName) => Number(tagName.tagId) == tag.tag.tagId)?.tagName || '' },
        checked: tag.checked,
      }));
      setTagList(_tagList);
    }
  }, [dataList]);

  //チェックされてたらそのtagIdにフラグをたて、一覧用データリストにデータ入れてる。書き方他に思い浮かばんかった
  useEffect(() => {
    const _checkedDataList: TagData[] = [];
    dataList.forEach((data) => {
      var i = 0;
      tagList.map((tag) => {
        if (tag.checked) {
          data.tagId == tag.tag.tagId ? (i = i + 1) : (i = i + 0);
        }
      });
      i == 1 && _checkedDataList.push(data);
    });
    setCheckedDataList(_checkedDataList);
  }, [dataList, tagList]);

  const onChangeData = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    if (newTagData?.ec != undefined) setNewTagData({ ...newTagData, [name]: value });
  };

  const onClickAdd = async () => {
    const now: Date = new Date();
    const createdAt: Timestamp = Timestamp.fromDate(now);
    //バリデーションどうにかする
    if (newTagData?.ec != undefined) {
      const ob = {
        tagId: newTagData.tagId,
        ph: Number(newTagData.ph),
        temperature: Number(newTagData.temperature),
        humidity: Number(newTagData.humidity),
        ec: Number(newTagData.ec),
        n: Number(newTagData.n),
        p: Number(newTagData.p),
        k: Number(newTagData.k),
        createdAt: new Date(createdAt.seconds * 1000),
      };
      await addDoc(collection(db, 'users', userId, 'data'), ob);
      location.reload();
    }
  };

  const changeIsAdding = () => {
    setIsAdding(!isAdding);
    setIsEditing(false);
  };
  const changeIsEditing = () => {
    setIsEditing(!isEditing);
    setIsAdding(false);
  };

  //仮
  const onClickUpdate = () => {
    setUpdateFlag(updateFlag + 1);
    location.reload();
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <TopSelecter from={from} to={to} />
        <Box>
          <Button colorScheme="green" onClick={changeIsAdding} size="lg" mx="2" w="150px">
            {isAdding ? '戻る' : 'データの追加'}
          </Button>
          {isEditing ? (
            <>
              <Button colorScheme="yellow" onClick={changeIsEditing} size="lg" mx="2" w="68px">
                戻る
              </Button>
              <Button colorScheme="yellow" onClick={onClickUpdate} size="lg" mx="2" w="68px">
                更新
              </Button>
            </>
          ) : (
            <Button colorScheme="yellow" onClick={changeIsEditing} size="lg" mx="2" w="150px">
              データの編集
            </Button>
          )}
        </Box>
      </Flex>

      <Box
        w="full"
        rounded="8"
        border={isEditing ? '4px' : '1px'}
        borderColor={isEditing ? 'red.300' : 'gray.300'}
        maxHeight="60vh"
        overflow="scroll"
      >
        <Table>
          <Tbody>
            <Tr bgColor={'gray.200'}>
              {tagDataItems.map((data: TagDataItem) => (
                <Th key={data.id}>
                  <Text>{data.text}</Text>
                  <Text>[{data.unit}]</Text>
                </Th>
              ))}
              <Th></Th>
            </Tr>
            {/* mapでやる */}
            {isAdding && (
              <Tr>
                <Td>
                  <Input value={newTagData.ph} name="ph" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.temperature} name="temperature" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.humidity} name="humidity" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.ec} name="ec" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.n} name="n" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.p} name="p" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.k} name="k" onChange={onChangeData} />
                </Td>
                <Td>
                  <Input value={newTagData.tagId} name="tagId" onChange={onChangeData} />
                </Td>
                <Td>
                  <Button colorScheme="green" onClick={onClickAdd}>
                    追加
                  </Button>
                </Td>
              </Tr>
            )}
            {checkedDataList.map((data: any) => (
              <DataRaw key={data.id} data={data} isEditing={isEditing} updateFlag={updateFlag} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
