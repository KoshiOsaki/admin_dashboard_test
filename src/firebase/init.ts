import { FirebaseApp, initializeApp } from 'firebase/app';
import { doc, DocumentData, DocumentReference, Firestore, getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCfYVbhL_RbG-CIW8HWFmPiXmtmj3MxouM',
//   authDomain: 'nohsight.firebaseapp.com',
//   projectId: 'nohsight',
//   storageBucket: 'nohsight.appspot.com',
//   messagingSenderId: '781052463639',
//   appId: '1:781052463639:web:aaa6a78d1f41f6cf4faa52',
//   measurementId: 'G-76MEC26F18',
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

// FireStore
export const firestore: Firestore = getFirestore();
export const db: DocumentReference<DocumentData> = doc(firestore, 'version', '1');
