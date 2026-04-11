<script lang="ts">
	import { browser } from "$app/environment";
	import type { Ticket } from "$lib/Ticket";
	import { onMount } from "svelte";
    
    let data = $props();

    let tickets = $state<Ticket[]>([]); 
    let payment_open = $state(false);
    
    let purchaseID = $state<string | null>(data.purchaseID);
    // Set current tickets as the cookie 'cart' in localStorage.
    if (typeof window !== 'undefined'){
        let cart: string | null = localStorage.getItem('cart');
        let cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];

        let t = []
        for (const ticket of cart_parsed){
            console.log("Ticket: ", ticket);
            t.push(ticket)
        }
        tickets = t;
        payment_open = localStorage.getItem('PaymentReady') === 'true';
    }
    onMount(() => {
        // Formats the string in input into a xxx xx xxx rather than xxxxxxxx. 
        const input = document.getElementById('Phone') as HTMLInputElement | null;
        if (input) {
            input.addEventListener('input', () => {
                // Remove non-digits
                const digits: string = input.value.replace(/\D/g, '');
                
                // Format as 555 55 555 instead of 55555555. 
                const formatted: string = digits.replace(
                    /(\d{3})(\d{2})(\d{0,3})/,
                    (_, a: string, b: string, c: string) => (c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a)
                );
                input.value = formatted;
            });
        };
        const form_tickets = document.getElementById('form_tickets') as HTMLInputElement;

        form_tickets.value = JSON.stringify(tickets);
        console.log("TICKETS TO STRING: ", JSON.stringify(tickets))
    });
    function remove_ticket(ticket: Ticket) {
        let cart: string | null = localStorage.getItem('cart');
        let cart_parsed: Ticket[] = cart ? JSON.parse(cart) : [];
        
        const new_cart = cart_parsed.filter(item => item !== ticket);
        
        localStorage.setItem('cart', JSON.stringify(new_cart)); // updates the "cookie"
        tickets = [...new_cart]; // updates the actual cart on screen.  
    }
</script>   

<div class="form_div">
    <form id="person_data" method="POST">
        <input id="form_name"    name="form_name"     type="text"   placeholder="Navn" />
        <input id="form_email"   name="form_email"    type="email"  placeholder="Email"/>
        <input id="form_phone"   name="form_phone"    type="tel"    placeholder="Telefon Nummer"/>
        <input id="form_tickets" name="form_tickets"  type="hidden"/>
        <!-- <input type="submit" /> # moved elsewhere. -->
    </form>
</div>


<!-- {#if purchaseID !== null}
<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <p>Tickets: {tickets}</p>
        <p>Dette er billetten IDen din: {purchaseID}</p>
    </div>
{/if} -->

<div class="tickets"> 
    {#each tickets as ticket}
    <div style="display: flex; flex-direction: row;">
        <div class="ticket_div">
            <p>
                Ticket {ticket.index}
            </p>
            <p>1200kr</p>
        </div>
        <button class="ticket_delete_button" onclick={() => remove_ticket(ticket)}>✘</button>
    </div>
    {/each}
    <p>Total pris: {tickets.length * 1200}kr</p>
    <button type="submit" form="person_data" class="checkout_button" style="width: 100%;" onclick={() => {localStorage.setItem('PaymentReady', 'true')}}>Betal nå</button>
</div>

{#if payment_open}
<div style="width: 100%; height: 550px; display: flex; flex-direction: column; margin: auto; position: relative; justify-content: center; gap: 8px;">
    <div style="width: 500px; display: flex; margin: auto; background-color: lightgrey; border: 1px solid whitesmoke; border-radius: 8px; padding: 32px; gap: 8px; font-style: oblique; text-align: center;">
        <div>
            <p>Du kan betale med VIPPS via denne QR koden.</p>
            <p><br>ELLER<br><br>Betal direkte til bankkonto som er skrevet under</p>
            <p style="background-color: whitesmoke; border: 1px solid red; border-radius: 8px; margin-top: 8px;">3000 65 74293</p>
            <p style="color: red; margin-top: 4px;">VIKTIG: Skriv informasjon i betalingen din med navn og plass.</p>
        </div>
        <img src='/qr_gjovdal.jpg' alt='Payment QR Code.' style="width: 250px; position: relative; margin: auto;">
    </div>
</div>
{/if}

<div style="height: 750px;"></div>

<style>
    /** FORM - Personal Info **/
    .form_div {
        display: flex; 
        flex-direction:column; 
        width: 600px; 
        margin: auto; 
        margin-top: 16px;
    }
    .form_div form {
        display: flex; 
        flex-direction:column;
    }
    /* Tickets list */
    .tickets {
        margin: auto;
        
        display: flex;
        flex-direction: column;
        gap: 4px;
        background-color: whitesmoke;
        padding: 8px;
        position: relative;
        margin-left: auto;
        margin-top: 32px;
        
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
    .ticket_delete_button {
        position: relative; 
        background-color: #ff3020;
        margin: 0px; 
        margin-left: 4px; 
        height: auto;
        width: 45px;
        border: 1px solid red;
        border-radius: 8px;
        color: black;
        font-size: large;
    }
    .ticket_delete_button:hover {
        background-color: transparent;
        background: repeating-linear-gradient( -45deg, red, lightcoral 8px, red 2px, orange 8px );
        border: 2px solid black;
    }
    /* Checkout Button */
    .checkout_button {
        background-color: darkgray;
        border-radius: 8px;
        width: 100%;
        border: solid 1px grey;
    }
</style>