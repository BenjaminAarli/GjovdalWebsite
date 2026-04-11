import type { Actions } from '@sveltejs/kit';
import { db } from '$lib/server/firebase_admin';
import admin from 'firebase-admin';

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const data  = Object.fromEntries(await request.formData());
            
            const form_user      = data.form_user    as string; 
            const form_text      = data.form_text    as string; 
            const form_image_src = data.form_image   as string; 

            await db.collection('posts').add({
                user: form_user,
                text: form_text,
                image_src: form_image_src || "",
                title: "Test Title.",
                created_at: admin.firestore.FieldValue.serverTimestamp()
            });

            return { success: true }
        } catch ( error ) {
            console.error("Couldn't Set ticket: ", error);
            return {error: "Failed to create ticket."};
        }
    } 
}