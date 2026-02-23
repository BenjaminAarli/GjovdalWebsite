import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { ticket } from "$lib/server/db/schema";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const { email, quantity } = data;
    await db.insert(ticket).values({
        buy_date: 20250221, 
        ticket_days: 1,
        price: 300,
        is_demo: true,
    });

    return new Response(JSON.stringify({ success: true }));
};


// The days are integers. 
// Friday is 1, Saturday 2, Sunday 3. 
// Friday and Saturday is 4, Friday and Sunday is 5, 
// Saturday and Sunday is 6, 
// Friday, Saturday and Sunday is 7. 