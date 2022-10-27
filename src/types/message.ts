import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Message {
  id: string;
  isMe: boolean;
  text: string;
  unread: boolean;
  createdAt: Date;
}

export const messageFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const _message: Message = {
    id: doc.id,
    isMe: doc.data()['isMe'],
    text: doc.data()['text'],
    unread: doc.data()['unread'],
    createdAt: new Date(doc.data()['createdAt'].seconds * 1000),
  };
  const message = JSON.parse(JSON.stringify(_message));
  return message;
};

//Date型の整形
export const reformToDate = (d: Date) => {
  const date = new Date(d);
  var addZero = (num: any) => {
    if (num <= 9) {
      num.toString();
      num = '0' + num;
    }
    return num;
  };
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayOfWeekId = date.getDay();
  let dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeekId];
  let hour = date.getHours();
  let minute = addZero(date.getMinutes());
  return {
    month,
    day,
    dayOfWeek,
    hour,
    minute,
  };
};
