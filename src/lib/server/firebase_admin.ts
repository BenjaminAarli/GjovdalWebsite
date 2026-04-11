// src/lib/server/firebase_admin.ts
import { browser } from '$app/environment';
import type { Firestore } from 'firebase-admin/firestore';

let dbInstance: Firestore | null = null;
let initError: Error | null = null;

async function initializeFirestore(): Promise<Firestore | null> {
    // 1. Never run this on the client-side.
    if (browser) {
        console.warn('Firebase Admin should not be initialized in the browser.');
        return null;
    }

    // 2. Return an existing instance if we have one.
    if (dbInstance) return dbInstance;

    // 3. If initialization previously failed, don't keep trying.
    if (initError) return null;

    try {
        const keyString = process.env.FIREBASE_KEY_JSON;

        // 4. Handle build-time gracefully. If the env var isn't set, we stop here.
        //    This prevents the build from crashing and doesn't throw an error.
        if (!keyString) {
            console.warn('⚠️ FIREBASE_KEY_JSON environment variable is not set. This is expected during the build phase. Firestore will not be available.');
            return null;
        }

        // 5. Parse the environment variable.
        const keyJson = JSON.parse(keyString);

        // 6. Validate the required fields.
        if (!keyJson.private_key || !keyJson.client_email || !keyJson.project_id) {
            console.error('❌ FIREBASE_KEY_JSON is missing required fields ("private_key", "client_email", "project_id").');
            return null;
        }

        // 7. Fix the private key formatting (this is required).
        keyJson.private_key = keyJson.private_key.replace(/\\n/g, '\n');

        // 8. Dynamically import 'firebase-admin' only when needed at runtime.
        const admin = await import('firebase-admin');

        // 9. Initialize the app if it's not already.
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(keyJson)
            });
            console.log('✅ Firebase Admin app initialized.');
        }

        // 10. Get and configure Firestore.
        dbInstance = admin.firestore();
        
        // Use a specific database ID if one is provided
        const databaseId = process.env.FIREBASE_DATABASE_ID || 'gjovdal';
        dbInstance.settings({ databaseId });
        
        console.log(`✅ Connected to Firestore database '${databaseId}'`);

        return dbInstance;
    } catch (error) {
        // 11. Catch any other errors (e.g., JSON parsing errors).
        console.error('❌ FATAL: Failed to initialize Firebase Admin:', error);
        initError = error as Error;
        return null;
    }
}

// Export a proxy that lazily initializes Firestore only when a method is called.
// This is the key to a successful build, as it prevents any Firebase code from running at build time.
export const db = new Proxy({} as Firestore, {
    get(_, prop) {
        // Return an async function for any property access (e.g., db.collection('purchases').get())
        return async (...args: any[]) => {
            const firestore = await initializeFirestore();
            if (!firestore) {
                throw new Error(`Firestore is not available. Method '${String(prop)}' cannot be called.`);
            }
            // @ts-ignore - We know this is a Firestore method.
            const method = firestore[prop];
            if (typeof method === 'function') {
                return method.apply(firestore, args);
            }
            return method;
        };
    }
});

// Helper function for explicit initialization if needed elsewhere.
export async function getDatabase() {
    return initializeFirestore();
}