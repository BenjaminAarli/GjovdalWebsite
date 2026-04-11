<script lang="ts">
    import { onMount } from 'svelte';
    import type { Ticket, TicketTypes } from '$lib/Ticket';
	import { collection, getDocs } from 'firebase/firestore';
	import { getDatabase, tickets } from '$lib/firebase';
    
    interface Props {
        starting_id?: number;
        field: string;
        grid_amount?: number;
        [key: string]: any;
    }
    let {
        starting_id = 0, 
        field = "", 
        grid_amount = -1,
        tickets_selected = $bindable([]),
        onTicketsSelectedChange, 
        ...restProps
     }: Props = $props();
    
    // let tickets_selected: Ticket[] = $state<Ticket[]>([]);
    let ticket_slots: Ticket[] = $state<Ticket[]>([]);

    let id = $state<number>();

    let filtered = $derived(
        ticket_slots
            .filter((ticket: Ticket) => ticket.field == field)          // Filter by color
            .sort((a, b) => a.index - b.index)                          // Sort by index, lowest to highest.
    ); 
    
    let display_array = $derived(
        grid_amount === -1
        ? filtered
        : filtered.slice(starting_id, starting_id + grid_amount)
    )

    onMount(async () => { 
        tickets.then((data: Ticket[]) => {
            ticket_slots.push(...data);
        });
    });

    function ticket_clicked(ticket: Ticket) {
        if (ticket.state === 'unavailable') {
            return;
        } else
        if (ticket.state === 'available') {
            ticket.state = 'selected';
        } else if (ticket.state === 'selected') {
            ticket.state = 'available';
        };
        // ticket_slots = ticket_slots.map((t: { index: number; }) => t.index === ticket.index ? ticket : t);
        tickets_selected = ticket_slots.filter((t: { state: string; }) => t.state === 'selected');
        onTicketsSelectedChange?.(tickets_selected);

        // dispatch('tickets_selected', { detail : tickets_selected});
    }
</script>

<div class="ticket_grid" {...restProps}>
    {#each display_array as i}
        <div class="ticket_block {i.state}" style="background-color: {i.field}">
            <button style="font-size: xx-small;" onclick={() => ticket_clicked(i)}>
                <h2 style="pointer-events: none;">
                    {#if i.state === 'unavailable'}
                        <i><p style="pointer-events: none; color: darkgrey;">{i.index}</p></i>
                    {:else}
                        {i.index}
                    {/if}
                </h2>
            </button>
        </div>
    {/each}
</div>

<style>
    .ticket_grid {
        position: absolute;
        /* grid-template-rows is set in the style of the element. */
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;

        border: 1px solid blue;
        
        background-color: lightslategray;
        column-gap: 4px;  
        height: auto;      
   }
   .ticket_block {
        border: 1px solid black;
        font-size: 1em;
        width: auto;
        height: auto;
        background-color: green;
        display: flex;
        flex-direction: row;
        overflow: hidden;
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