<script lang="ts">
    import type { Ticket, TicketTypes } from '$lib/Ticket';
    import NumberGrid from '$lib/NumberGrid.svelte';

    let grid_a_selected: Ticket[] = [];
    let grid_b_selected: Ticket[] = [];

    let tickets_selected: Ticket[] = [...grid_a_selected, ...grid_b_selected];
    $: tickets_are_selected = tickets_selected.length > 0;

    function update_tickets(){
        tickets_selected = [...grid_a_selected, ...grid_b_selected];
    }

    console.log(tickets_selected);
</script>

<div class="container">
    <NumberGrid bind:tickets_selected={grid_a_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}}/>
    <NumberGrid bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={31} />
</div>

<div class="buy_button{tickets_are_selected ? 'something_selected' : ''}">
    <a href="/sale">
        <button>
            Kjøp nå!
        </button>
    </a>
</div>

<div class="list">
    <h2>Selected Tickets:</h2>
    <ul>
        {#each tickets_selected as ticket}
            <li>Ticket: {ticket.id} - {ticket.state}</li>
        {/each}
    </ul>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }
   .buy_button {
    width: 200px;
    height: 50px;
    background-color:green;
    border: 2px solid black;
    border-radius: 32px;
    justify-content: center;
    display: flex;
    position: absolute;
    bottom: -200px;
   }
   .list {
    position: absolute;
    top: 20px;
    left: 20px;
   }
</style>