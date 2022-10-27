import { TagData } from '@/types/data';
import { atom } from 'recoil';

export const dataListState = atom<TagData[]>({
  key: 'dataListState',
  default: [],
});
