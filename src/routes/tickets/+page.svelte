<script lang="ts">
    import type { Ticket, TicketTypes } from '$lib/Ticket';
    import NumberGrid from '$lib/NumberGrid.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

    let grid_a_selected: Ticket[] = [];
    let grid_b_selected: Ticket[] = [];

    let tickets_selected: Ticket[] = [...grid_a_selected, ...grid_b_selected];
    $: tickets_are_selected = tickets_selected.length > 0;

    function update_tickets(){
        tickets_selected = [...grid_a_selected, ...grid_b_selected];
    }

    function move_to_sale_page(){
        if (browser){
            localStorage.setItem('cart', JSON.stringify(tickets_selected));
        };
        goto('/sale');
    };
</script>

<div class="BGImageDiv">
    <img src="/bad_map_googed.png" alt="Map">
    <div class="container">
        <NumberGrid style="position: absolute; left: 780px; top: 370px; scale: 0.8; transform: rotate(12deg);" bind:tickets_selected={grid_a_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} />
        <NumberGrid style="position: absolute; left: 600px; top: -15px; scale: 0.7;" bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={31} />
    </div>
</div>

<div class="buy_button{tickets_are_selected ? 'something_selected' : ''}">
    <button on:click={() => {move_to_sale_page()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounde">
        Kjøp nå!
    </button>
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
    .BGImageDiv {
        position: relative;
        margin: auto;
        width: 90vw;
        height: 90vh;
        border: 4px solid black;
        border-radius: 8px;
    }
    .BGImageDiv img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .container {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 1;
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