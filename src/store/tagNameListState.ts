import { TagName } from '@/types/tag';
import { atom } from 'recoil';

export const tagNameListState = atom<TagName[]>({
  key: 'tagNameListState',
  default: [],
});
