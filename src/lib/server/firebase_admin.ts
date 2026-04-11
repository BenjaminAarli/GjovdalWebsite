import admin from 'firebase-admin';
import 'dotenv/config';
import { getDoc } from 'firebase/firestore';

const keyString: string = process.env.FIREBASE_KEY_JSON || "{}";
const keyJson = JSON.parse(keyString) || {};

if (keyJson) {
  console.log(keyJson);
  keyJson.private_key = keyJson.private_key.replace(/\\n/g, '\n');
};

admin.initializeApp({
  credential: admin.credential.cert(keyJson)
});

export const db = admin.firestore();

const settings = { databaseId: 'gjovdal' };
db.settings(settings);

export function getDatabase(){
  return db;
}
