<script lang="ts">
    import type { Ticket, TicketTypes } from '$lib/Ticket';
    import NumberGrid from '$lib/NumberGrid.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

    let map_layer = true;

    let grid_a_selected: Ticket[] = [];
    let grid_b_selected: Ticket[] = [];

    let tickets_selected: Ticket[] = [...grid_a_selected, ...grid_b_selected];
    $: are_tickets_selected = tickets_selected.length > 0;

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

<div style="justify-content: center; width: 100%; display: flex; margin: 16px;">
    <button class="MapChangeButton" on:click={() => {map_layer = !map_layer}}>Klick her for å see kart</button>
</div>
<div class="BGImageDiv">
    {#if map_layer}
    <img src="/badmap_03_nogrid_02.png" alt="Map">
    <div class="container">
        <NumberGrid style="position: absolute; left: 237px; top: 285px; transform: scale(0.75, 0.95);   grid-template-rows: repeat(6, 1fr);" grid_amount={36} bind:tickets_selected={grid_a_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} />
        <NumberGrid style="position: absolute; left: 255px; top: 38px;  transform: scale(0.75, 0.75);   grid-template-rows: repeat(7, 1fr);" grid_amount={28} bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={1} />
        <NumberGrid style="position: absolute; left: 140px; top: 20px;  transform: scale(0.75, 0.7);    grid-template-rows: repeat(6, 1fr);" grid_amount={12} bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={13} />
        <NumberGrid style="position: absolute; left: 200px; top: 55px;  transform: scale(0.75);         grid-template-rows: repeat(2, 1fr);" grid_amount={2}  bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={1} /> 
        
        <NumberGrid style="position: absolute; left: 25px;  top: 190px; width: 200px; height: 75px; transform: scale(0.75, 0.75);    grid-template-rows: repeat(3, 1fr);" grid_amount={15}  bind:tickets_selected={grid_b_selected} on:tickets_selected={() => {update_tickets(); console.log(tickets_selected)}} starting_id={1} /> 
    </div>
    {:else}
        <iframe title="Overlay Map" src="https://www.google.com/maps/d/embed?mid=1jqO1f3EsvO3zMc1XXGKe1frrifqFhdk&ehbc=2E312F" style="width: 100%; height: 100%;"></iframe>
    {/if}
</div>
                    
<div class="buy_div {are_tickets_selected ? 'tickets' : ''}">
    <button on:click={() => {move_to_sale_page()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round">
        Kjøp nå!
    </button>
</div>

<style>
    .MapChangeButton {
        position: relative;
        width: 200px;
        height: 60px;
        
        margin: auto;

        border: 1px solid grey;
        border-radius: 4px;
        background-color: whitesmoke;
    }
    .BGImageDiv {
        position: relative;
        margin: auto;
        width: 500px;
        height: 500px;
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

   .buy_div {
       background-color:gray;
        width: 200px;
        height: 50px;
        border: 2px solid black;
        border-radius: 32px;
        justify-content: center;
        display: flex;
        bottom: -200px;
        z-index: 5;
        margin: auto;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .buy_div.tickets {
        background-color: purple;
        width: 200px;
        height: 50px;
        border: 2px solid black;
        border-radius: 32px;
        justify-content: center;
        display: flex;
        bottom: -200px;
        z-index: 5;
        margin: auto;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .buy_div button {
        background-color: transparent;
    }
</style>