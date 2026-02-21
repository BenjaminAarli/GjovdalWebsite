export type TicketTypes = 'available' | 'unavailable' | 'selected';
export type Ticket = {
        id: number;
        price: number | null;
        // data: string; 
        // name: string;
        state: TicketTypes;
    }
