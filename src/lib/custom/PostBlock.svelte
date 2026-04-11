<script lang="ts">
    export let user = "Unnamed User";
    export let src  = "";
    export let text = "No text";
    export let time = "No Date";
</script>

<div style="width: 500px; height: auto; background-color: whitesmoke; border: 4px solid #fff; border-radius: 4px; ">
    <div style="height: 50px; background-color: grey; display: flex; justify-content: center; align-items: center;">
        <img style='width: 25px; height: 25px;' src='/icons/circle.png' alt='Publisher Face'/>
        <h1 style='margin: 0px'>{user}</h1>
    </div>
    <h1 style="margin: 8px; margin-left: 32px; margin-right: 32px;">{text}</h1>
    {#if (src)}<img alt="Preview" src={src} style="width: 400px; height: 400px; display: flex; margin: auto; border: 4px solid grey; border-radius: 4px;"/> {/if}
    <p style='margin: 8px; text-align: right;'>{time}</p>
</div>

<style></style>