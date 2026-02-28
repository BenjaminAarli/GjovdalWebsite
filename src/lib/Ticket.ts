export type TicketTypes = 'available' | 'unavailable' | 'selected';
export type Ticket = {
    id: number;
    state: TicketTypes;
}

export type TicketDB = Ticket & {
    price: number; 
    date_of_purchase: number; 
    name_of_buyer: string; 
}