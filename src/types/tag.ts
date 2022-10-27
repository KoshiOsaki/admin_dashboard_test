import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface Tag {
  tagId: number;
  fieldId: string;
  tagName: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export const tagFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  // const createdAt: Timestamp = doc.data()['createdAt'] as Timestamp;
  const tag: Tag = {
    tagId: Number(doc.id),
    fieldId: doc.data()['fieldId'],
    tagName: doc.data()['tagName'],
    // createdAt: new Date(createdAt.seconds * 1000),
  };
  return tag;
};
