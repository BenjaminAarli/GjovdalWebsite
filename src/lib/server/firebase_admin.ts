import admin from 'firebase-admin';
import 'dotenv/config';

const keyString: string = process.env.FIREBASE_KEY_JSON || "{}";
let keyJson;

try {
    keyJson = JSON.parse(keyString);
} catch (e) {
    console.warn('⚠️ Failed to parse FIREBASE_KEY_JSON, using empty object');
    keyJson = {};
}

if (keyJson.private_key && keyJson.client_email && keyJson.project_id) {
    if (keyJson.private_key) {
        keyJson.private_key = keyJson.private_key.replace(/\\n/g, '\n');
    }
    
    admin.initializeApp({
        credential: admin.credential.cert(keyJson)
    });
    
    console.log('✅ Firebase Admin initialized');
} else {
    console.warn('⚠️ Firebase credentials incomplete - skipping initialization');
}

export const db = admin.firestore();

const settings = { databaseId: 'gjovdal' };
db.settings(settings);

export function getDatabase(){
  return db;
}
