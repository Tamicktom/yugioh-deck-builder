// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import type { FirebaseOptions } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBnEC66ecVizvG0l0oC0DyyIo94scVBPTI",
  authDomain: "yugioh-627a6.firebaseapp.com",
  projectId: "yugioh-627a6",
  storageBucket: "yugioh-627a6.appspot.com",
  messagingSenderId: "540225837156",
  appId: "1:540225837156:web:586d2f4e17d0a2cc272771",
  measurementId: "G-X0HZ691WLS",
};

// Initialize Firebase
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;