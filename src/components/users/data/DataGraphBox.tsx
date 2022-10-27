import { cropsDataState } from '@/store/cropsDataState';
import { dataListState } from '@/store/dataListState';
import { fieldListState } from '@/store/fieldListState';
import { selectedFieldState } from '@/store/selectedFieldState';
import { tagListForGraphState } from '@/store/tagListForGraphState';
import { tagNameListState } from '@/store/tagNameListState';
import { Crop } from '@/types/crop';
import { TagChecked, TagData } from '@/types/data';
import { Field } from '@/types/field';
import { Tag } from '@/types/tag';
import { Box, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { GraphSelector } from './GraphSelector';
import { TagDataGraph } from './TagDataGraph';
import { TagSelector } from './TagSelector';

interface Props {}

export const DataGraphBox = ({}: Props) => {
  const [dataList, setDataList] = useRecoilState<TagData[]>(dataListState);
  const [tagList, setTagList] = useRecoilState<TagChecked[]>(tagListForGraphState);
  const [tagNameList, setTagNameList] = useRecoilState<Tag[]>(tagNameListState);

  //コピペなので要改善
  const dt1 = new Date();
  const dt2 = new Date();
  dt2.setDate(dt2.getDate() - 2);
  const [to, setTo] = useState<string>(dt1.toISOString().split('T')[0]);
  const [from, setFrom] = useState<string>(dt2.toISOString().split('T')[0]);
  const { register, handleSubmit } = useForm();
  const [cropsData, setCropsData] = useRecoilState<Crop[]>(cropsDataState);
  const [selectedTagItem, setSelectedTagItem] = useState<string>('');
  const [selectedField, setSelectedField] = useRecoilState<Field | null>(selectedFieldState);
  const [fieldList, setFieldList] = useRecoilState<Field[]>(fieldListState);
  const [baseValue, setBaseValue] = useState<number[]>([]);
  const [cropName, setCropName] = useState<any>('');

  //タグIDソート用の、データの存在するタグIDのリストをつくる。上のリストとグラフで別にした。重複削除と、tagNameをあててる
  useEffect(() => {
    if (dataList) {
      let _tagList: TagChecked[] = [];
      dataList.map((data) => {
        _tagList.push({ tag: { tagId: data.tagId, tagName: '', fieldId: '' }, checked: false });
      });
      _tagList = _tagList.filter((tag, index) => _tagList.findIndex((e) => e.tag.tagId == tag.tag.tagId) === index);
      _tagList = _tagList.map((tag) => ({
        tag: { tagId: tag.tag.tagId, fieldId: '', tagName: tagNameList.find((tagName) => Number(tagName.tagId) == tag.tag.tagId)?.tagName || '' },
        checked: tag.checked,
      }));
      setTagList(_tagList);
    }
  }, [dataList, tagNameList]);

  useEffect(() => {
    setCropName(cropsData.find((crop) => crop.cropId == selectedField?.cropId)?.name || '');
  }, [selectedField]);

  useEffect(() => {
    // selectedTagItem && setBaseValue(cropsData.find((crop) => crop.cropId == selectedField?.cropId)[selectedTagItem][0]);
  }, [selectedField, selectedTagItem]);

  return (
    <>
      <GraphSelector from={from} to={to} />
      <HStack>
        <Box>
          <TagDataGraph />
        </Box>
        <TagSelector />
      </HStack>
    </>
  );
};
