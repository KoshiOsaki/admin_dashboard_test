import { Field } from '@/types/field';
import { atom } from 'recoil';

export const fieldListState = atom<Field[]>({
  key: 'fieldListState',
  default: [],
});
