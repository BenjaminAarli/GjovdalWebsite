import { getDatabase } from "$lib/server/db";
import { purchase, ticket } from "$lib/server/db/schema";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const data  = Object.fromEntries(await request.formData());
            // const cart: string | undefined = (await data).get('cart')?.toString();
            // const cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];
            
            const fullname      = data.form_name    as string; 
            const email         = data.form_email   as string;
            const phone         = data.form_phone   as string;
            const tickets       = data.form_tickets as string;
            
            // const note = (await form).get('note');
            
            console.log("\n\n\nFormdata: ", fullname, " | ", email, " | ", phone, "\n\n\n")

            const [pending_purchase] = await getDatabase()
            .insert(purchase)
            .values({
                fullname: fullname, 
                email: email,
                cellphone: phone,
                tickets: tickets,
                notes: "I am a cute little man.",
                    vipps_confirmed: false, 
                    vipps_payment_status: 'PENDING',
                })
                .returning({id: purchase.id});
              
            if (!pending_purchase) {
                throw new Error("Failed to create purchase");
            }

            const vippsReponse = await null; // Create vipps purchase and check if it completes. 

            return { success: true }
        } catch ( error ) {
            console.error("Couldn't Set ticket: ", error);
            return {error: "Failed to create ticket."};
        }
    } 
}

// async function vippsPayment(
//     params: {
//         amount: number, 
//         phoneNumber: string, 
//         orderNumber: number, 
//         orderRef: string, 
//         returnURL: string
//     }){
//         const auth = Buffer.from(
//             process.env.VIPPS_CLIENT_ID + ':' + process.env.VIPPS_CLIENT_SECRET
//         ).toString('base64');
//     }
