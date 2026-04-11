import type { Timestamp } from "firebase/firestore";

export type TicketTypes = 'available' | 'unavailable' | 'selected';

export type Ticket = {
    field: string;
    index: number; 
    purchaseID: string;
    state: TicketTypes;
    sold_at: Timestamp;
}
