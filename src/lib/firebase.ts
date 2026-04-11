// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import type { Ticket } from "./Ticket";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3shEZRnCouOIPnd1ou8uV3fmigoPfhk0",
  authDomain: "project-1ae50be0-355d-41fa-b51.firebaseapp.com",
  projectId: "project-1ae50be0-355d-41fa-b51",
  storageBucket: "project-1ae50be0-355d-41fa-b51.firebasestorage.app",
  messagingSenderId: "762087576377",
  appId: "1:762087576377:web:57ef6d49c4bfb1d8900ee8",
  measurementId: "G-HJEBHS9BV2"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app, 'gjovdal');

export function getDatabase(){
    return db;
}

const getTicketsFromDatabase = async () => {
    const querySnap = await getDocs(collection(getDatabase(), 'tickets'));
    const postdata = querySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), 
    }));

    return postdata as Ticket[];
};
export const tickets = getTicketsFromDatabase();
