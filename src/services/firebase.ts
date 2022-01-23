import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore/lite';

let firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export function connection(document: string) {
  return collection(getFirestore(app), document);
}
