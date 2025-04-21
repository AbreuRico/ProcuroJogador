// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBisb_iMUw7aCE5sFT6FFLSNi9580wPuqc",
  authDomain: "procuro-jogador-7433d.firebaseapp.com",
  projectId: "procuro-jogador-7433d",
  storageBucket: "procuro-jogador-7433d.firebasestorage.app",
  messagingSenderId: "326360981893",
  appId: "1:326360981893:web:90c787369971b87c9264ec",
  measurementId: "G-FFZF8EJTDX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
