import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Crop {
  cropId: string;
  name: string;
  ph: number[];
  ec: number[];
  n: number[];
  p: number[];
  k: number;
}

export const cropFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const crop: Crop = {
    cropId: doc.id,
    name: doc.data()['name'],
    ph: doc.data()['ph'],
    ec: doc.data()['ec'],
    n: doc.data()['n'],
    p: doc.data()['p'],
    k: doc.data()['k'],
  };
  return crop;
};
