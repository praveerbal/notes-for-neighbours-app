import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAjAAru3ZryzIZ3tUAFq4u2mrpyNo-sEk",
  authDomain: "notes-for-neighbours-app.firebaseapp.com",
  projectId: "notes-for-neighbours-app",
  storageBucket: "notes-for-neighbours-app.firebasestorage.app",
  messagingSenderId: "803119547239",
  appId: "1:803119547239:web:a4230ee2ded794e25125c2",
  measurementId: "G-S8DD5M2BFX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);