import { db } from '$lib/server/firebase_admin';
import type { Actions } from "@sveltejs/kit";
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.WEBHOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.AUTOMAIL_EMAIL,
        pass: process.env.AUTOMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false  // DEV ONLY
    },
    debug: true,
    logger: true,
})

async function sendMail(name: string, email: string, purchaseID: string, text: string){
    const mail = {
        from: '"Gjøvdal Festivalen"  automail@gjovdalfestivalen.no',
        to: email,
        subject: "Gjovdalfestivalen har mottat din bestilling.",
        text: text,
        html: "<p>" + text + "</p>" + "<br><br><b>Dette er en automatisk mail. Ikke send email til denne emailen.</b>"
    };
    const info = await transporter.sendMail(mail);
}

export async function load ({ cookies }) {
    const data = cookies.get('purchaseID') || "";
    return {
        data
    }
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        try {
            const data  = Object.fromEntries(await request.formData());
            // // const cart: string | undefined = (await data).get('cart')?.toString();
            // // const cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];
            
            const fullname      = data.form_name    as string; 
            const email         = data.form_email   as string;
            const phone         = data.form_phone   as string;
            const tickets       = data.form_tickets as string;
            
            const purchaseID = (Math.random() + 1).toString(36).substring(2);
            
            // Create the purchase and add it to the database.
            await db.collection('purchase').add({
                created_at: admin.firestore.FieldValue.serverTimestamp(),
                updated_at: admin.firestore.FieldValue.serverTimestamp(),
                updated_by: '',
                email: email,
                fullname: fullname,
                paid: false,
                phone: phone,
                ticket: tickets,
                ID: purchaseID,
            })

            // Send the user an email confirming their purchase has been added. Await payment.
            const firstname = fullname.split(' ', 2)[0];
            await sendMail(firstname, email, purchaseID, 
                "Dette er din bilett for bestilling nummer: " + purchaseID + "<br>" +
                "Du har bestilt plassene: " + tickets + 
                "<br><br>Vi venter betaling via vipps eller direkte fra banken. <br><br>Vi sender mail når vi bekrefter betaling.<br>Om du har betalt, da kan du ignorere denne mailen."
            ).catch(error => {
                console.error("EMail failed to send: ", error.message)
            });

            // Set the cookie.
            cookies.set("purchaseID", purchaseID, {
                path: '/',
                httpOnly: false,
                sameSite: 'lax',
                secure: false, 
                maxAge: 60 * 60 * 24, // 60 seconds -> 60 (min) -> 24 (hours)
            });
            
            // if (!fullname || !email || !phone || !tickets) {
            //     throw new Error("Missing Form Information");
            // };

            return { success: true }
        } catch ( error ) {
            console.error("Couldn't Set ticket: ", error);
            return {error: "Failed to create ticket."};
        }
    } 
}

