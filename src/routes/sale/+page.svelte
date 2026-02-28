<script lang="ts">
	import type { Ticket } from "$lib/Ticket";
	import { onMount } from "svelte";
    
    let style_id: string = "0";
    let tickets: Ticket[] = [];
    
    onMount(() => {
        let stored = localStorage.getItem('style');
        style_id = stored ? JSON.parse(stored) : style_id;
        console.log("StyleID: ", style_id);
    })

    if (typeof window !== 'undefined'){
        let cart: string | null = localStorage.getItem('cart');
        let cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];
        for (const ticket in cart_parsed){
            console.log("Ticket: ", ticket);
        }
        tickets = cart_parsed;
        console.log("This is what the ticket gets us: ", cart);
    }
    
    function style_changed(){
        console.log('Changed something: ', style_id);
        if (style_id){ 
            localStorage.setItem('style', JSON.stringify(style_id)); 
            console.log("Set StyleID as: ", style_id)
        };
    }
</script>   

<select bind:value={style_id} on:change={style_changed} style="position: fixed; right: 20px; top: 20px;">
    <option value="0" selected>Style 1</option>
    <option value="1">Style 2</option>
</select>

<div class="tickets"> 
    {#each tickets as ticket}
        <div class="ticket_div">
            <p>
                Ticket {ticket.id}
            </p>
        </div>
    {/each}    
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
        border: 1px solid red;

        position: relative;
        margin-left: auto;
        margin-top: auto;
        
        width: 100px;
        height: fit-content;
    }
    .ticket_div {
        width: 100%;
        background-color: greenyellow;
        border: 1px solid grey;
        border-radius: 8px;

        padding: 4px;
    }
</style>