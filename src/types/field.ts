import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Field {
  fieldId: string;
  cropId: string;
  fieldName: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export const fieldFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  // const createdAt: Timestamp = doc.data()['createdAt'] as Timestamp;
  const field: Field = {
    fieldId: doc.id,
    cropId: doc.data()['cropId'],
    fieldName: doc.data()['fieldName'],
    // createdAt: new Date(createdAt.seconds * 1000),
  };
  return field;
};
