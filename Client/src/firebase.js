
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-c5a7c.firebaseapp.com",
  projectId: "real-estate-c5a7c",
  storageBucket: "real-estate-c5a7c.firebasestorage.app",
  messagingSenderId: "73192616605",
  appId: "1:73192616605:web:a9053dc571ccae19d09a74"
};


export const app = initializeApp(firebaseConfig);