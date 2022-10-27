import { fieldListState } from '@/store/fieldListState';
import { selectedFieldState } from '@/store/selectedFieldState';
import { tagListForTableState } from '@/store/tagListForTableState';
import { TagChecked } from '@/types/data';
import { Field } from '@/types/field';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Menu, MenuButton, MenuList, Select, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

interface Props {
  from: string;
  to: string;
}

export const TopSelecter = ({ from, to }: Props) => {
  const [tagList, setTagList] = useRecoilState<TagChecked[]>(tagListForTableState);
  const [fieldList, setFieldList] = useRecoilState<Field[]>(fieldListState);
  const [selectedField, setSelectedField] = useRecoilState<Field | null>(selectedFieldState);
  const handleChange = (index: number) => {
    let _tagList: TagChecked[] = [];
    tagList.map((tag) => {
      _tagList.push({ tag: { tagId: tag.tag.tagId, fieldId: '', tagName: tag.tag.tagName }, checked: tag.checked });
    });
    _tagList[index].checked = !_tagList[index].checked;
    setTagList(_tagList);
  };

  const handleChangeField = (e: any) => {
    const _selectedField = fieldList.find((field) => field.fieldName == e.target.value);
    setSelectedField(_selectedField);
  };

  //畑選択、日付ソートできるように
  return (
    <HStack my="4">
      <Select placeholder="畑を選択" w="200px" onChange={handleChangeField}>
        <option value="All">All</option>
        {fieldList.map((field) => (
          <option value={field.fieldName}>{field.fieldName}</option>
        ))}
      </Select>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="blue">
          タグID(複数選択可)↓
        </MenuButton>
        <MenuList minWidth="240px">
          {tagList &&
            tagList.map((tag, index) => (
              <HStack key={index} onClick={() => handleChange(index)} px="3" py="1">
                {tag.checked ? <CheckIcon /> : <Box w="16px"></Box>}
                <Text>{tag.tag.tagId}</Text>
                <Text>{tag.tag.tagName}</Text>
              </HStack>
            ))}
        </MenuList>
      </Menu>

      <div className="form-group col-2">
        <label>from</label>
        <input
          name="from"
          type="date"
          className={`form-control `}
          defaultValue={from}
          // ref={register({ required: true, min: '2020-12-25' })}
        />
      </div>
      <div className="form-group col-2">
        <label>to</label>
        <input
          name="to"
          type="date"
          className={`form-control `}
          defaultValue={to}
          // ref={register({ required: true, min: '2020-12-25' })}
        />
      </div>
    </HStack>
  );
};
