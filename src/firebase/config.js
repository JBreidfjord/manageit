import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvoUQgvp46qC7bNS_PlvBmKo89eg_n3SI",
  authDomain: "project-management-site-f9d8f.firebaseapp.com",
  projectId: "project-management-site-f9d8f",
  storageBucket: "project-management-site-f9d8f.appspot.com",
  messagingSenderId: "863160189566",
  appId: "1:863160189566:web:1244a2c32ff623f7eb8e2f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, timestamp };
