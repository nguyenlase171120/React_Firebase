// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCTQ18tvo8ks6IPiS_WipaNgQ_PGe1tE-A',
  authDomain: 'react-firebase-11331.firebaseapp.com',
  projectId: 'react-firebase-11331',
  storageBucket: 'react-firebase-11331.appspot.com',
  messagingSenderId: '1003924361151',
  appId: '1:1003924361151:web:a9cdd5d60aac2bfa089b0a',
  measurementId: 'G-2CN2TWJFN0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
