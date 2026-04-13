// Import the functions you need from the SDKs you need
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { collection, getDocs, getFirestore, type Firestore } from "firebase/firestore";
import type { Ticket } from "./Ticket";
import { getAuth, type Auth } from "firebase/auth";
import { browser } from "$app/environment";

const firebaseConfig = {
  apiKey: "AIzaSyD3shEZRnCouOIPnd1ou8uV3fmigoPfhk0",
  authDomain: "project-1ae50be0-355d-41fa-b51.firebaseapp.com",
  projectId: "project-1ae50be0-355d-41fa-b51",
  storageBucket: "project-1ae50be0-355d-41fa-b51.firebasestorage.app",
  messagingSenderId: "762087576377",
  appId: "1:762087576377:web:57ef6d49c4bfb1d8900ee8",
  measurementId: "G-HJEBHS9BV2"
};

let app : FirebaseApp | null    = null;
let db  : Firestore | null      = null;
let auth: Auth | null           = null;

if (browser && !getApps().length) {
    app = initializeApp(firebaseConfig);
    db  = getFirestore(app);
    auth = getAuth(app);
}

function getDatabase(){
    if (!db) {
        app = initializeApp(firebaseConfig);
        db  = getFirestore(app);
        auth = getAuth(app);
    }
    return db;
}

const getTicketsFromDatabase = async () => {
    const querySnap = await getDocs(collection(getDatabase(), 'tickets'));
    const postdata = querySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), 
    }));
    return postdata;
};

export const tickets = getTicketsFromDatabase();

export {
    app, db, auth
}
