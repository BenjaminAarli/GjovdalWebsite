import { getDatabase } from "$lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onMount } from "svelte";

interface Ticket {
    available: number;
    field: string; 
    index: number; 
    purchaseID: string;
}

const getTicketsFromDatabase = async (): Promise<Ticket[]> => {
    const querySnap = await getDocs(collection(getDatabase(), 'tickets'));
    const postdata = querySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), 
    }));
    return postdata;
};

export let _tickets: Ticket[] = [];
onMount(() => {
    getTicketsFromDatabase().then(list => {
        _tickets = list;
    });
})
