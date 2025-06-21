import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwZyllgzoYY68fbCyAwMzE-holtABUC9o",
  authDomain: "test-f3c14.firebaseapp.com",
  projectId: "test-f3c14",
  storageBucket: "test-f3c14.firebasestorage.app",
  messagingSenderId: "889462382273",
  appId: "1:889462382273:web:fab9e61c52bcea59b8be40",
  measurementId: "G-HPFNCXGW2N"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;