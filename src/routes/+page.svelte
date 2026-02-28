
<script lang="ts">

    type ARTIST = {
        src: string, 
        name: string,
        day: string, 
    };
    let artists: ARTIST[] = [
        {src:"/artists/EvyAndJan.png", name:"Evy og Jan", day:"Fredag, Lørdag, Søndag."},
        {src:"/artists/Screenshot 2025-02-16 152557.png", name:"Lillepus", day:"Lørdag, Søndag."},
        {src:"/artists/images.jpg", name:"Toad.", day:"Søndag."},
    ];

    let is_dev = true;
</script>

<div>
    <div class="FrontSection">
        <div class="Front">
            <img alt="Gjovdalfestival" src="/gjovdal_telt (DEMO)_smallblur.png">
            <div style="position: relative; width: 50%; height: 100%; margin: auto; background: linear-gradient(to top, #00000000, purple);">
                <h1 style="color: white; font-size: xx-large; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; shadow: 8px;">
                    Nyt en festival i Gjovdal!
                </h1>
                <p style="color: whitesmoke; font-size: large; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                    Bli med pa en festival i Lille Gjovdal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <a href="/tickets">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="position: relative; margin: auto; margin: 8px; ">
                        Kjøp Billeter her!   
                    </button>
                </a>
            </div>
        </div>
    </div>
    <div style="width: 100%; max-width: 60%; position: relative; height: auto; margin: auto; display: flex; flex-direction: row; justify-content: space-between;">
        <p style="position: relative; font-size: 50px; font-family: s;">Ser du etter billetter?</p>
        <a href="/tickets" style="margin: auto;">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="position: relative; margin-top: auto; height: 75%;">
                Kjøp Billeter her!   
            </button>
        </a>
    </div>
    <div class="ArtistsSection">
        <p style="position: relative; margin: auto; font-family:monospace; font-size: 80px; text-align: center; ">~ 2026 ~</p>
        <div class="Artists">
            {#each artists as artist}
                <div class="ArtistBlock">
                    <img src={artist.src} alt="Bilde av {artist.name}" />
                    <div>
                        <p style="font-size: x-large; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Name: {artist.name}<br>
                        Dager: {artist.day}</p>
                    </div>
                </div>
            {/each}
        </div>
   </div>
</div>


<style>
    .FrontSection {
        position: relative;
        display: block;
        width: 100%;
        height: 1000px;
        background-color: #AE00FF;
    }
    .Front {
        position: relative;
        display: block;
        background-color: #AE00FF;
        top: 128px;
        margin: auto;
        width: 100%;
        /* max-width: 95vh; */
        height: 700px;
        object-position: center;
    }
    .Front p, h1 {
        position: relative;
        z-index: 1;
        max-width: 600px;
        padding: 8px;
        overflow-wrap: break-word;
        word-break: break-word;
    }
    .Front img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
        object-fit: cover;
    }

    .ArtistsSection {
        position: relative;
        width: 100%;
        height: 1000px;
        display: block;
        background-color: darkgray;
        color: whitesmoke;
    }

    .Artists {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-auto-columns: 1fr;
        max-width: 65%;
        width: 100%;
        margin: auto;

        padding: 32px;
        gap: 8px;
    }

    .ArtistBlock {
        position: relative;
        display: flex;
        flex-direction: row;

        background-color: #4444448f;
        padding: 8px;
    }
    .ArtistBlock img {
        width: 200px;
        height: 200px;
    }

</style>