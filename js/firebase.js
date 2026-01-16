import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdSMaU4yIPL0VKnD0G9bQ_ojyFbJtmVvM",
  authDomain: "gellezsgca-business-cent-44a59.firebaseapp.com",
  projectId: "gellezsgca-business-cent-44a59",
  storageBucket: "gellezsgca-business-cent-44a59.appspot.com",
  messagingSenderId: "264543270872",
  appId: "1:264543270872:web:a43cf64eaa5c092b2664ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
