import { db } from '$lib/server/firebase_admin.js'
import type { Ticket } from '$lib/Ticket';

export interface Purchase {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    created_at: string | null;
    updated_at: string | null;
    ticket: Ticket[];
    status?: string;
}

export async function load({ cookies }){
    const docRef = db.collection('purchase');
    const docSnap = await docRef.get();

    const purchases: Purchase[] = docSnap.docs
    .map(doc => {
        const data = doc.data();

        return {
            id: doc.id, 
            ...data,
            created_at: data.created_at?.toDate?.().toISOString() || null,
            updated_at: data.updated_at?.toDate?.().toISOString() || null,
        } as Purchase;
    }).sort((a, b) => {
        const date_a = a.created_at ? new Date(a.created_at).getTime() : 0;
        const date_b = b.created_at ? new Date(b.created_at).getTime() : 0;

        return date_b - date_a;
    });

    return {
        purchases
    };
}

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            // gentickets();
            return { success: true }
        }
        catch ( error ) {
            return {error: "Faield to do this."}
        }
    },
};