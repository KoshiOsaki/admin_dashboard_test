import { TagId } from '@/types/data';
import { atom } from 'recoil';

export const tagListForGraphState = atom<TagId[]>({
  key: 'tagListForGraphState',
  default: [],
});
