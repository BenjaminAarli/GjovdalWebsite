import { db } from "$lib/server/db/index"
import { testUpload } from "$lib/server/db/schema"
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    upload: async () => {
        await db.insert(testUpload).values({
            content: "This is a stupid fucking test."
        });

        return { success : true };
    }
}

