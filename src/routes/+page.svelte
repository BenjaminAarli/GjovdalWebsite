
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
                    Bli med pa en festival i Lille Gjovdal. Ta med kona di, Barna, fucking bikja om du vil. I don't care. 
                    Jeg trenger bare text her. Trenger du text ring 911. Ring imorra. Ring I dag.
                    Har du problem med protata? Ring legen din eller ring meg. Jeg kan ta en titt. 
                </p>
                <a href="/tickets">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Kjøp Billeter her!   
                    </button>
                </a>
            </div>
        </div>
    </div>
    <div class="ArtistsSection">
        <p style="position: relative; margin: auto; margin-top: 32px; font-family:monospace; font-size: 80px; text-align: center; ">~ 2026 ~</p>
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
    .Front button, p, h1 {
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