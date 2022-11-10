import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMpHN03UxS325nixGdfRNfIQSS11EjYmk',
  authDomain: 'sosmed-project-d7d14.firebaseapp.com',
  projectId: 'sosmed-project-d7d14',
  storageBucket: 'sosmed-project-d7d14.appspot.com',
  messagingSenderId: '883239027283',
  appId: '1:883239027283:web:6c4a9b2bc56ea586fdbca6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
