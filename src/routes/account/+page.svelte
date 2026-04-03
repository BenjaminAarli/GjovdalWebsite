
<div class='LoginBlock'>
    <form>
        <input type="text"      placeholder="Account Name"/>
        <input type="password"  placeholder="Password"/>
        <input type="submit" value="Login" style='background-color: white; border: 1px solid black; border-radius: 8px; padding: 4px; margin-top: 4px;' />
    </form>
</div>
<div style="height: 500px;"></div>
<style>
    .LoginBlock {
        position: relative; 
        display: flex; 
        width: 500px;   height: 500px; 
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
</style>