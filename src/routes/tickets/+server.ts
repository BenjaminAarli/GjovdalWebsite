import { json } from "@sveltejs/kit";
import { getDatabase } from "$lib/server/db";
import { ticket } from "$lib/server/db/schema";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const { email, quantity } = data;
    await getDatabase().insert(ticket).values({
        buy_date: 20250221, 
        ticket_days: 1,
        price: 300,
        is_demo: true,
    });

    return new Response(JSON.stringify({ success: true }));
};
 