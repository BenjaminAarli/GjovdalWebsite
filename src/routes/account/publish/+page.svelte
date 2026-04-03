<script lang="ts">
    let post_text = "asdas"; 
    let post_src  = "";
    let post_user = "Tom";

    const post_time = new Date().toDateString();
    let file; 
    function handle_image_change(event: any) {
        file = event.target.files[0];
        if (file) {
            post_src = URL.createObjectURL(file);
        }
    }

</script>

<div class='LoginBlock'>
    <form>
        <input type="text" bind:value={post_text} placeholder="Text"/>
        <input type="file" accept="image/*" on:change={handle_image_change}  style='background-color: white; border: 1px solid black; border-radius: 8px; padding: 4px; margin-top: 4px;'/>
        <input type="submit" value="Publish"      style='background-color: white; border: 1px solid black; border-radius: 8px; padding: 4px; margin-top: 4px;' />
    </form>
</div>

<div style='width: 50%; height: 32px; display: flex; justify-content: center; align-items: center; margin: auto; margin-top: 32px; margin-bottom: 32px; background-color: green;'><h1>POST PREVIEW BELOW</h1></div>

<div class="PostsBlock">
    <div class="Posts">
        <div style="width: 500px; height: auto; background-color: whitesmoke; border: 4px solid #fff; border-radius: 4px; ">
            <div style="height: 50px; background-color: grey; display: flex; justify-content: center; align-items: center;">
                <img style='width: 25px; height: 25px;' src='/icons/circle.png' alt='Publisher Face'/>
                <h1 style='margin: 0px'>{post_user}</h1>
            </div>
            <h1 style="margin: 8px; margin-left: 32px; margin-right: 32px;">{post_text}</h1>
            {#if (post_src)}<img alt="Preview" src={post_src} style="width: 400px; height: 400px; display: flex; margin: auto; border: 4px solid grey; border-radius: 4px;"/> {/if}
            <p style='margin: 8px'>{post_time}</p>
        </div>
        <button style="border: 1px solid black; width: 100%; height: 45px; background-color: aliceblue;">Se mer</button>
    </div>
</div>

<div style="height: 500px;"></div>
<style>
    .LoginBlock {
        position: relative; 
        display: flex; 
        width: 500px;   height: 250px; 
        margin: auto;   margin-top: 100px; 
        background-color: whitesmoke;
        border: 1px solid black;
        border-radius: 8px;
    }
    .LoginBlock form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .PostsBlock {
        width: 100%;
        height: auto; 
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .Posts {
        height: 100%; 
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin: auto;
        gap: 24px;
    }
</style>