import { Field } from '@/types/field';
import { atom } from 'recoil';

export const selectedFieldState = atom<Field | null>({
  key: 'selectedFieldState',
  default: null,
});
