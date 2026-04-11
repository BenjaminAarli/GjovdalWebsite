import { gentickets } from "$lib/generate_tickets";
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            // gentickets();
            return { success: true }
        }
        catch ( error ) {
            return {error: "Faield to do this."}
        }
    }
};