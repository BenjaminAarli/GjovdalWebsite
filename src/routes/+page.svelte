

<body class="bg-gray-100">
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
        <div class="Artists">
            <div class="ArtistDiv">
                <img alt="bilde av evy og jan." src="/artists/EvyAndJan.png">
            </div>
        </div>
    </div>
    <p>Penis</p>
    </div>

</body>

<style>
    .FrontSection {
        position: relative;
        display: block;
        width: 100%;
        height: 90vh;
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
    }
    .ArtistDiv {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        width: 150px;
        height: 150px;
    }
    .ArtistDiv img {
        width: 100%;
        height: 100%;
    }
</style>