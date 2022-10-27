import { TagId } from '@/types/data';
import { atom } from 'recoil';

export const tagListForTableState = atom<TagId[]>({
  key: 'tagListForTableState',
  default: [],
});
