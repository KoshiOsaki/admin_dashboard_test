import { User } from '@/types/user';
import { atom } from 'recoil';

export const userListState = atom<User[]>({
  key: 'userListState',
  default: [],
});
