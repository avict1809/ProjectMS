import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAjGmZ8tltDxZ7pdwSdkqd3K99L3BkluiI",
  authDomain: "test21-32a7f.firebaseapp.com",
  projectId: "test21-32a7f",
  storageBucket: "test21-32a7f.firebasestorage.app",
  messagingSenderId: "1019494832681",
  appId: "1:1019494832681:web:aafeadd13458ea96605a38"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}