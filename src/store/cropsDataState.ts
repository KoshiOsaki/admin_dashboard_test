import { Crop } from '@/types/crop';
import { atom } from 'recoil';

export const cropsDataState = atom<Crop[]>({
  key: 'cropsDataState',
  default: [],
});
