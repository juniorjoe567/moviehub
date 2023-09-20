// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGjeu1dGeCw7yD3NT5VLylVRzSMpHRYAU",
  authDomain: "moviehub-84984.firebaseapp.com",
  projectId: "moviehub-84984",
  storageBucket: "moviehub-84984.appspot.com",
  messagingSenderId: "533523810266",
  appId: "1:533523810266:web:7473cdcb894abc194722e3",
  measurementId: "G-BZRVXCZC6E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
