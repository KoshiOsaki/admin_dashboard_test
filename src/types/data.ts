import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Tag } from './tag';
export interface TagData {
  dataId?: string;
  tagId: number;
  ph: number;
  temperature: number;
  humidity: number;
  ec: number;
  n: number;
  p: number;
  k: number;
  createdAt: Date;
  date?: any;
}

export interface ChartData {
  tagId: number | undefined;
  item: number | undefined;
  date: any;
}
export interface TagChecked {
  tag: Tag;
  checked: boolean;
}

export const dataFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const _data: TagData = {
    dataId: doc.id,
    tagId: doc.data()['tagId'],
    ph: doc.data()['ph'],
    humidity: doc.data()['humidity'],
    temperature: doc.data()['temperature'],
    ec: doc.data()['ec'],
    n: doc.data()['n'],
    p: doc.data()['p'],
    k: doc.data()['k'],
    createdAt: new Date(doc.data()['createdAt'].seconds * 1000),
  };
  const data = JSON.parse(JSON.stringify(_data));
  return data;
};

export interface TagDataItem {
  id: string;
  text: string;
  unit: string | null;
}

export const tagDataItems: TagDataItem[] = [
  { id: 'ph', text: 'pH', unit: 'pH' },
  { id: 'temperature', text: '温度', unit: '℃' },
  { id: 'humidity', text: '湿度', unit: '%' },
  { id: 'ec', text: 'EC', unit: 'ms/cm' },
  { id: 'n', text: '窒素', unit: 'mg/kg' },
  { id: 'p', text: 'リン', unit: 'mg/kg' },
  { id: 'k', text: 'カリウム', unit: 'mg/kg' },
  { id: 'tagId', text: 'タグID', unit: null },
  { id: 'date', text: '日付', unit: null },
];
