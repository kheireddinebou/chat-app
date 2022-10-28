import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-a81d9.firebaseapp.com",
  projectId: "chat-a81d9",
  storageBucket: "chat-a81d9.appspot.com",
  messagingSenderId: "937255766869",
  appId: "1:937255766869:web:903c3fb786e2111f98fddc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
