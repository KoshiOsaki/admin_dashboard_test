import { Message } from '@/types/message';
import { atom } from 'recoil';

export const messageListState = atom<Message[]>({
  key: 'messageListState',
  default: [],
});
