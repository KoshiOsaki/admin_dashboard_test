import { cropsDataState } from '@/store/cropsDataState';
import { fieldListState } from '@/store/fieldListState';
import { selectedFieldState } from '@/store/selectedFieldState';
import { Crop } from '@/types/crop';
import { Field } from '@/types/field';
import { HStack, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
interface Props {
  from: string;
  to: string;
}

export const GraphSelector = ({ from, to }: Props) => {
  const [cropsData, setCropsData] = useRecoilState<Crop[]>(cropsDataState);
  const [selectedTagItem, setSelectedTagItem] = useState<string>('');
  const [selectedField, setSelectedField] = useRecoilState<Field | null>(selectedFieldState);
  const [fieldList, setFieldList] = useRecoilState<Field[]>(fieldListState);
  const handleChange = (e: any) => {
    setSelectedTagItem(e.target.value);
  };

  return (
    //動的に基準表示、期間のソートできるように
    <HStack my="10" spacing="6">
      <Select placeholder="選択して下さい" w="200px" onChange={handleChange}>
        <option value="ph">PH</option>
        <option value="temperature">温度</option>
        <option value="humidity">湿度</option>
        <option value="ec">EC</option>
        <option value="n">窒素</option>
        <option value="p">リン</option>
        <option value="k">カリウム</option>
      </Select>

      <Text fontWeight="bold">
        {cropsData.find((crop) => crop.cropId == selectedField?.cropId)?.name}：{selectedTagItem}{' '}
        {selectedTagItem && cropsData.find((crop) => crop.cropId == selectedField?.cropId)[selectedTagItem][0]}〜
        {selectedTagItem && cropsData.find((crop) => crop.cropId == selectedField?.cropId)[selectedTagItem][1]}
      </Text>

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
