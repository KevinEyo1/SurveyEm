// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgxxZSOvNIw_os3fhi5p7g-zROPAhrEDc",
  authDomain: "surveyem-ad0cf.firebaseapp.com",
  projectId: "surveyem-ad0cf",
  storageBucket: "surveyem-ad0cf.appspot.com",
  messagingSenderId: "112444130464",
  appId: "1:112444130464:web:2282776a3f75796019f5c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
