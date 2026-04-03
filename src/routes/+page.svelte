<script lang="ts">
    let current_year = new Date().getFullYear();
    let hover_index = "-1";

    type ARTIST = {
        src: string, 
        name: string,
        day: number[], 
    };
    
    let artists: ARTIST[] = [
        {src:"/artists/EvyAndJan.png", name:"Evy og Jan", day: [0, 1, 2]},
        {src:"/artists/Screenshot 2025-02-16 152557.png", name:"Lillepus", day: [1, 2]},
        {src:"/artists/images.jpg", name:"Toad.", day: [2]},
    ];

    type POSTS = {
        user: string, 
        day: string,
        src: string,
        text: string,
    }

    let posts: POSTS[] = [
        {user: "Hans Person", day: new Date().toDateString(), src: '/adjaiwjd.jpg', text: "Hello world"},
        {user: "Mars Planet", day: new Date().toDateString(), src: '', text: "Denne Posten er uten bilde. Så du kan skrive om hva som helst, football, kanonball, e-sports, spiller ingen rolle. Jeg kan skrive om verdensrommet om jeg vil. Who cares! Bla Ble Blo."},
        {user: "Mars Planet", day: new Date().toDateString(), src: '/awdaawdawd.jpeg', text: "Lille Laget"},
    ];

</script>

<div style="position: relative; display: flex; flex-direction: column;">
    <div class="FrontSection">
        <div class="Front">
            <img alt="Gjovdalfestival" src="/gjovdal_telt (DEMO)_smallblur.png">
            <div class="FrontSquare">
                <h1 style="color: white; font-size: xx-large; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; shadow: 8px;">
                    Nyt en festival i Gjovdal!
                </h1>
                <p style="color: whitesmoke; font-size: large; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                    Bli med pa en festival i Lille Gjovdal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <a href="/tickets" style="position: relative; margin: auto; width: 100%; display: flex; justify-content: left;">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="position: relative; margin: auto; margin: 8px; width: 250px; height: 55px">
                        Kjøp Billeter her!   
                    </button>
                </a>
            </div>
        </div>
    </div>
    <div style="width: 100%; max-width: 60%; position: relative; height: auto; margin: auto; display: flex; flex-direction: row; justify-content: space-between;">
        <p style="position: relative; font-size: 50px; font-family: s;">Ser du etter billetter?</p>
        <a href="/tickets" style="margin: auto;">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " style="position: relative; margin-top: auto; height: 75%;">
                Kjøp Billeter her!   
            </button>
        </a>
    </div>
    <div class="ArtistsSection">
        <p class="ArtistsSectionText" style="font-size: 80px; margin-bottom: 0px;">~ {current_year} ~</p>
        <p class="ArtistsSectionText" style="font-size: 20px; margin-top: 0px;">Artister</p>
        <div class="ArtistGrid">
            {#each artists as artist}
                <div class="ArtistBlock">
                    <img src={artist.src} alt="Bilde av {artist.name}" />
                    <div class="ArtistBlockTextDiv">
                        <p>Name: {artist.name}</p>
                        <div style="display: flex; flex-direction: row; s background-color: green; border: 1px solid black; border-radius: 8px; width: fit-content; padding: 4px; gap: 2px">
                            {#each ["Fredag", "Lørdag", "Søndag"] as day, index}
                                <!-- Check the index, as Fre is 5, Lør is 6 and Søn is 7. -->
                                <div role="button" tabindex="{index}" class="ArtistBlockDay {artist.day.includes(index) ? '' : 'Deactive'}" on:mouseenter={() => {hover_index = artist.name + index}} on:mouseleave={() => {hover_index = ""}}>
                                    <p style="pointer-events: none; vertical-align: middle; margin: auto; font-size: 2em; {index === 2 ? 'color: #d9534f;' : ''}">
                                        {day}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
   </div>
</div>

<div style="width: 100%; height: 82px; display: flex; flex-direction: column; margin: auto; justify-content: center; align-items: center; gap: 2px;">
    <h1>Opdateringer fra laget!</h1>
    <img src='/icons/arrow.png' alt='arrow down' style='width: 32px; height: 32px;'/>
</div>

<div class="PostsBlock">
    <div class="Posts">
        {#each posts as post}
        <div style="width: 500px; height: auto; background-color: whitesmoke; border: 4px solid #fff; ">
            <div style="height: 50px; background-color: grey; display: flex; justify-content: center; align-items: center;">
                <img style='width: 25px; height: 25px;' src='/icons/circle.png' alt='Publisher Face'/>
                <h1 style='margin: 0px'>{post.user}</h1>
            </div>
            <h1>{post.text}</h1>
            {#if (post.src)}<img alt="{post.text}" src={post.src} style="width: 400px; height: 400px; display: flex; margin: auto; border: 4px solid grey; border-radius: 4px;"/> {/if}
            <p>{post.day}</p>
        </div>
        {/each}
    </div>
</div>

<style>
    .PostsBlock {
        width: 100%;
        height: auto;
        min-height: 1000px; 
        background-color: #999;
        padding-top: 20px;
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

    .ArtistBlockDay {
        justify-content: center; 
        text-align: center; 
        width: 45px; 
        height: 45px;
        border: 1px solid silver;
        background-color: white;
        color: black;
        flex: 1;
        transition: flex 0.3s ease;
    }

    .ArtistBlockDay p {
        white-space: nowrap;
        overflow: hidden;
        width: 1ch;
        transition: width 0.25s;
    }
    .ArtistBlockDay:hover p {
        width: 6ch;
    }

    .ArtistBlockDay:hover {
        flex: 7;
    }
    
    .ArtistBlockDay.Deactive {
        border: 1px solid darkgrey;
        background-color: darkgrey;
        color: lightgrey;
    }

    .FrontSection {
        position: relative;
        display: block;
        width: 100%;
        height: auto;
        background-color: #AE00FF;
        padding-top: 64px;
        padding-bottom: 64px;
    }
    .Front {
        position: relative;
        display: block;
        background-color: #AE00FF;
        margin: auto;
        margin-top: 8px;
        margin-bottom: 8px; 
        width: 100%;
        height: 75vh;
        /* max-width: 95vh; */
        object-position: center;
    }
    .Front p, h1 {
        position: relative;
        z-index: 1;
        max-width: 800px;
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

    .FrontSquare {
        position: relative; 
        width: 100%; 
        max-width: 1250px;
        height: 100%; 
        margin: auto;
        background: linear-gradient(to top, #00000000, #AE00CFCC, #AE00FFaa, #AE00CCFF );
        padding: 16px;
    }

    .ArtistsSection {
        position: relative;
        width: 100%;
        height: 1000px;
        display: block;
        background-color: darkgray;
        color: whitesmoke;
    }

    .ArtistsSectionText {
        position: relative; 
        margin: auto; 
        font-family:monospace; 
        text-align: center; 
    }

    .ArtistGrid {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-auto-columns: 1fr;
        width: 100%;
        max-width: 1000px;
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
    .ArtistBlockTextDiv {
        margin: 8px;
    }
    .ArtistBlockTextDiv p {
        font-family: monospace;
        font-size: xx-large;
    }

</style>