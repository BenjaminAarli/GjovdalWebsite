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

        // 4. Handle build-time gracefully.
        if (!keyString) {
            console.warn('⚠️ FIREBASE_KEY_JSON environment variable is not set.');
            return null;
        }

        // 5. Parse and validate.
        const keyJson = JSON.parse(keyString);
        if (!keyJson.private_key || !keyJson.client_email || !keyJson.project_id) {
            console.error('❌ FIREBASE_KEY_JSON is missing required fields.');
            return null;
        }

        // 6. Fix the private key formatting.
        keyJson.private_key = keyJson.private_key.replace(/\\n/g, '\n');

        // 7. Import firebase-admin. We use 'require' here for compatibility with
        //    how Vite bundles server-side code, which can sometimes cause issues
        //    with dynamic `await import()` for this specific module.
        const admin = require('firebase-admin');

        // 8. Initialize the app. The previous error was because `admin.apps` was
        //    undefined. This check is safer.
        if (admin.apps && admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(keyJson)
            });
            console.log('✅ Firebase Admin app initialized.');
        } else if (!admin.apps) {
            // Fallback: just try to initialize if we can't check the apps array.
            try {
                admin.initializeApp({
                    credential: admin.credential.cert(keyJson)
                });
                console.log('✅ Firebase Admin app initialized (fallback).');
            } catch (appError) {
                // If it throws because the default app already exists, we can ignore it.
                console.warn('Firebase app may already exist:', appError);
            }
        }

        // 9. Get and configure Firestore.
        dbInstance = admin.firestore();
        
        const databaseId = process.env.FIREBASE_DATABASE_ID || 'gjovdal';
        dbInstance.settings({ databaseId });
        
        console.log(`✅ Connected to Firestore database '${databaseId}'`);

        return dbInstance;
    } catch (error) {
        console.error('❌ FATAL: Failed to initialize Firebase Admin:', error);
        initError = error as Error;
        return null;
    }
}

// Export the same proxy pattern. This is still the best way to prevent build errors.
export const db = new Proxy({} as Firestore, {
    get(_, prop) {
        return async (...args: any[]) => {
            const firestore = await initializeFirestore();
            if (!firestore) {
                throw new Error(`Firestore is not available. Method '${String(prop)}' cannot be called.`);
            }
            // @ts-ignore
            const method = firestore[prop];
            if (typeof method === 'function') {
                return method.apply(firestore, args);
            }
            return method;
        };
    }
});

export async function getDatabase() {
    return initializeFirestore();
}