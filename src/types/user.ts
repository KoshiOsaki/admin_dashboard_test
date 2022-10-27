import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface User {
  userId: string;
  userName: string;
  email: string;
  place: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export const userFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  // const createdAt: Timestamp = doc.data()['createdAt'] as Timestamp;
  // const updatedAt: Timestamp = doc.data()['updatedAt'] as Timestamp;
  const user: User = {
    userId: doc.id,
    userName: doc.data()['userName'] as string,
    email: doc.data()['email'] as string,
    place: doc.data()['place'] as string,
    // createdAt: new Date(createdAt.seconds * 1000),
    // updatedAt: new Date(updatedAt.seconds * 1000),
  };
  return user;
};
