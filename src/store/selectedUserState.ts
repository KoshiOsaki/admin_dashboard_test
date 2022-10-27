import { User } from '@/types/user';
import { atom } from 'recoil';

export const selectedUserState = atom<User>({
  key: 'selectedUserState',
  default: {
    userId: '',
    userName: '',
    email: '',
    place: '',
  },
});
