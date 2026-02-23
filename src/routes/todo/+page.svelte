<script lang="ts">
    let sections = {
        "Awating"   : [],
        "Doing"     : [],
        "Finished"  : []
    }
    type TODO = {
        desc: string,
    }
    let todos: TODO[] = []
</script>

<div class="div_center">
    {#each Object.keys(sections) as section}
       <div class="div_section">
            <div style="display: flex; flex-direction: row; justify-content: space-between">    
                <h1>{section}</h1>
                <button on:click={() => {}}>Add Note</button>
            </div>
            <div class="div_todos">
                <div class="todo">
                    <button on:click={() => {}}>◄</button>
                    <input placeholder="Fuck bitch" />
                    <button on:click={() => {}}>►</button>
                </div>
            </div>   
        </div>
    {/each}
</div>

<style>
    .div_center {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        position: relative;
        top: 100px;
        display: flex;
        flex-direction: row;
    }
    .div_section {
        width: 100%;
        border: 1px solid blue;
        display: flex;
        flex-direction: column;
    }
    .div_section button {
        background-color: beige;
        border: 1px solid black;
        height: 100%;
        padding-left: 4px;
        padding-right: 4px;
    }

    .div_todos {
        width: 100%;
        border: 1px solid red;
        display: flex;
        flex-direction: column;
    }

    .todo {
        width: 100%;
        background-color: whitesmoke;
        display: flex;
        flex-direction: row;
    }
    .todo input {width: 100%;}
</style>