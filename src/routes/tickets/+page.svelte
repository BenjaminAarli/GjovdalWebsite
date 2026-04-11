<script lang="ts">
    import type { Ticket, TicketTypes } from '$lib/Ticket';
    import NumberGrid from '$lib/custom/NumberGrid.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

    let map_layer = true;

    let grid_a_selected: Ticket[] = [];
    let grid_b_selected: Ticket[] = [];
    let grid_c_selected: Ticket[] = [];
    let grid_d_selected: Ticket[] = [];
    let grid_e_selected: Ticket[] = [];
    let grid_f_selected: Ticket[] = [];
    let grid_g_selected: Ticket[] = [];

    let tickets_selected: Ticket[] = [
        ...grid_a_selected,
        ...grid_b_selected,
        ...grid_c_selected,
        ...grid_d_selected,
        ...grid_e_selected,
        ...grid_f_selected,
        ...grid_g_selected,
        
    ];
    $: are_tickets_selected = tickets_selected.length > 0;
    let are_tickets_selected = true; // dev only.
    
    function update_tickets(){
        tickets_selected = [
        ...grid_a_selected,
        ...grid_b_selected,
        ...grid_c_selected,
        ...grid_d_selected,
        ...grid_e_selected,
        ...grid_f_selected,
        ...grid_g_selected,
    ];
        console.log("TICKETS SELECTED: " + tickets_selected)
    }

    function move_to_sale_page(){
        if (browser){
            console.log("TICKETS SELECTED: " + tickets_selected)
            localStorage.setItem('cart', JSON.stringify(tickets_selected));
        };
        goto('/sale');
    };
</script>

<div style="justify-content: center; width: 100%; display: flex; margin: 16px;">
    <button class="MapChangeButton" onclick={() => {map_layer = !map_layer}}>Klick her for å see kart</button>
</div>

<div class="BGImageDiv">
    {#if map_layer}
    <img src="/badmap.png" alt="Map">
    <div class="container">
        <!-- Red Section -->
        <NumberGrid id={1} style=" width: 21.5%;   height: 25.5%;  left: 254px;    top: 320px; grid-template-rows: repeat(6, 1fr);" grid_amount={36}           field={"Red"}                           bind:tickets_selected={grid_a_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} />
        <!-- Green Section -->
        <NumberGrid id={2} style=" width: 14%;     height: 29.3%;  left: 253.5px;  top: 95px;  grid-template-rows: repeat(7, 1fr);" grid_amount={28}           field={"Green"}                         bind:tickets_selected={grid_b_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} />
        <!-- Yellow Section -->
        <NumberGrid id={3} style=" width: 5%;      height: 6%;     left: 182px;    top: 119px; grid-template-rows: repeat(2, 1fr);" grid_amount={2}            field={"Yellow"}   starting_id={13}     bind:tickets_selected={grid_c_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} /> 
        <NumberGrid id={4} style=" width: 7.4%;    height: 25.5%;  left: 143px;    top: 51px;  grid-template-rows: repeat(6, 1fr);" grid_amount={12}           field={"Yellow"}                        bind:tickets_selected={grid_d_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} />
        <!-- Blue Section -->
        <NumberGrid id={5} style=" width: 25%;     height: 9.5%;   left: 45px;     top: 250px; grid-template-rows: repeat(3, 1fr);" grid_amount={15}           field={"Blue"}                          bind:tickets_selected={grid_e_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} /> 
        <NumberGrid id={6} style=" width: 5%;      height: 8.8%;   left: 182px;    top: 253px; grid-template-rows: repeat(2, 1fr); gap: 4px;" grid_amount={2}  field={"Blue"}      starting_id={21}    bind:tickets_selected={grid_f_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} /> 
        <NumberGrid id={7} style=" width: 21.5%;     height: 4.1%;   left: 63px;     top: 222px; grid-template-rows: repeat(1, 1fr);" grid_amount={6}          field={"Blue"}      starting_id={16}    bind:tickets_selected={grid_g_selected}     onTicketsSelectedChange={() => {update_tickets(); console.log(tickets_selected)}} /> 
    </div>
    {:else}
        <iframe title="Overlay Map" src="https://www.google.com/maps/d/embed?mid=1jqO1f3EsvO3zMc1XXGKe1frrifqFhdk&ehbc=2E312F" style="width: 100%; height: 100%;"></iframe>
    {/if}
</div>
                    
<div class="buy_div {are_tickets_selected ? 'tickets' : ''}">
    <button onclick={() => {
        move_to_sale_page()        
        }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round">
        Kjøp nå!
    </button>
</div>

{#if false}
    <div style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; background-color: #33333366; z-index: 2;">
        <div style="width: 600px; height: 600px; margin: auto; background-color: grey; display: flex; flex-direction: column; justify-content: center;">
            <p>Før du klikker ja, les dette. Det er viktig at<br>du kommer med riktig elektriskt utstryk. </p>
            <button style="background-color: whitesmoke; border: 1px solid white; width: 200px;">Jeg forstår at jeg skal<br>ta med riktig utstyr!</button>
        </div>
    </div>
{/if}

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