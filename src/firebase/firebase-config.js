import { initializeApp } from "firebase/app";
import * as auth from 'firebase/auth';
import * as db from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzKFrM_xugyLxyOetPhus9gnkmbOSd1es",
  authDomain: "react-redux-9fbfa.firebaseapp.com",
  projectId: "react-redux-9fbfa",
  storageBucket: "react-redux-9fbfa.appspot.com",
  messagingSenderId: "819960609137",
  appId: "1:819960609137:web:8e0df0480a7ccd4c695ed0",
  measurementId: "G-JQMXP1MZC2"
};

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new auth.GoogleAuthProvider();

export {app, googleAuthProvider, db, auth};