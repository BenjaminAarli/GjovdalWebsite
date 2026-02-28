<script lang="ts">
    import { onMount } from 'svelte';
    import type { Ticket, TicketTypes } from '$lib/Ticket';
    import { createEventDispatcher } from 'svelte';
    
    let amount = 30;
    export let starting_id = 1;

    let ticket_slots: Ticket[] = [];

    export let tickets_selected: Ticket[] = [];
    
    const dispatch = createEventDispatcher();

    onMount(() => {
        generateCells();
    });
    
    function generateCells() {
        let generated_tickets: Ticket[] = [];
        for (let i = 0; i < amount; i++) {
            const ticket : Ticket = {
                id: starting_id + i,
                state: Math.random() < 0.5 ? 'available' : 'unavailable',
            };
            generated_tickets.push(ticket);
            console.log(`Generated ticket with id ${ticket.id} and state ${ticket.state}`)
        };
        ticket_slots = generated_tickets;
    };

    function ticket_clicked(ticket: Ticket) {
        if (ticket.state === 'unavailable') {
            return;
        } else
        if (ticket.state === 'available') {
            ticket.state = 'selected';
        } else if (ticket.state === 'selected') {
            ticket.state = 'available';
        };
        ticket_slots = ticket_slots.map(t => t.id === ticket.id ? ticket : t);
        tickets_selected = ticket_slots.filter(t => t.state === 'selected');
        dispatch('tickets_selected', { detail : tickets_selected});
    }
</script>

<div class="ticket_grid" {...$$restProps}>
    {#each ticket_slots as i}
        <div class="ticket_block {i.state}">
            <button on:click={() => ticket_clicked(i)}>
                <h2>
                    {#if i.state === 'unavailable'}
                        <i><p style="color: darkgrey;">{i.id}</p></i>
                    {:else}
                        {i.id}
                    {/if}
                </h2>
            </button>
        </div>
    {/each}
</div>

<style>
    .ticket_grid {
        width: 200px;
        height: 400px;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        
        border: 1px solid blue;
        
        background-color: lightslategray;
        column-gap: 4px;        
   }
   .ticket_block {
        border: 1px solid black;
        font-size: 1rem;
        width: 100%;
        background-color: green;
        display: flex;
        flex-direction: row;
   }
   .ticket_block.available {
        background-color: lightgreen;
   }
   .ticket_block.selected {
        background-color: lightgreen;
        color: black;
        text-shadow: 0px 0px 3px whitesmoke;
        opacity: 0.8;
        background: repeating-linear-gradient( -45deg, lightgreen, darkgreen 8px, whitesmoke 2px, darkgreen 8px );
   }
   .ticket_block.unavailable {
        background-color: gray;
   }
   .ticket_block.available:hover {
        background-color: lightgreen;
        border: lightblue solid 1px;
   }
   .ticket_block button {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
   }
</style>