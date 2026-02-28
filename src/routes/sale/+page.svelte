<script lang="ts">
	import type { Ticket } from "$lib/Ticket";
	import { onMount } from "svelte";
    
    let tickets: Ticket[] = [];
    

    if (typeof window !== 'undefined'){
        let cart: string | null = localStorage.getItem('cart');
        let cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];
        for (const ticket in cart_parsed){
            console.log("Ticket: ", ticket);
        }
        tickets = cart_parsed;
        console.log("This is what the ticket gets us: ", cart);
    }
</script>   

<div class="tickets"> 
    {#each tickets as ticket}
        <div class="ticket_div">
            <p>
                Ticket {ticket.id}
            </p>
            <p>200kr</p>
        </div>
    {/each}    
    <p>Total pris: {tickets.length * 200}kr</p>
</div>

<div class="item-list">
    <vipps-mobilepay-button
        type="button"
        brand="vipps"
        language="no"
        variant="primary"
        rounded="true"
        verb="pay"
        stretched="false"
        branded="true"
        loading="false" 
    ></vipps-mobilepay-button>
</div>
<style>
    .item-list {
        position: relative;
        margin: auto;
        margin-top: 8px;
        width: 250px;

        display: flex;
        justify-content: center;
    }
    .tickets {
        margin: auto;

        display: flex;
        flex-direction: column;
        gap: 4px;
        background-color: whitesmoke;
        padding: 8px;
        position: relative;
        margin-left: auto;
        margin-top: 100px;
        
        width: 300px;
        height: fit-content;
    }
    .ticket_div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: 100%;
        background-color: greenyellow;
        border: 1px solid grey;
        border-radius: 8px;

        padding: 8px;
    }
</style>