import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'easy-orders-7eab1.firebaseapp.com',
  projectId: 'easy-orders-7eab1',
  storageBucket: 'easy-orders-7eab1.appspot.com',
  messagingSenderId: '282586877700',
  appId: '1:282586877700:web:e93b2222280a7aaa9d0a51',
  measurementId: 'G-P9GJC0CHZX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
