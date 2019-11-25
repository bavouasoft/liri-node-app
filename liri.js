

// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Please input text in command line.");

// When user input data and click enter key.
standard_input.on('data', function (data) {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        console.log('User Input Data : ' + data);
        parserCmd(data)

    }
});

parserCmd = function(data) {
    let cmdArray = data.split(' ').filter(x => x.length>0);
    if(cmdArray.length===0){
        console.log('Bad Command');
        return false
    }else{

        var expectedcmds = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];

        let cmdMain =  cmdArray[0];

        if (!expectedcmds.includes(cmdMain)){

            console.log(`Erreur : This comamnd : $cmdMain is not expected` );
        } else{

            if (cmdMain=='concert-this'){
                concertThis(cmdArray);
            }if (cmdMain=='spotify-this-song'){
                soptitythis(cmdArray);
            }if (cmdMain=='movie-this'){
                moviethis(cmdArray);
            }


        }

    }
}

concertThis = function( cmdsArrays){

   // ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

    const axios = require('axios');

    let artist =  cmdsArrays[1];

    let  url_Artist = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url_Artist).then(resp => {


        if (resp.data != '' && resp.data.length>0){

            for(let i = 0 ; i< resp.data.length ; i++){
                let element = resp.data[i];

                let venue = element.venue.name ;

                let location = element.venue.city +  ' - ' + element.venue.country;

                let dtEvent= element.datetime;

                let result = `Name of the venue: ${venue}   \n Venue location : ${location}  \n date of the Event :${dtEvent}  \n`

                console.log(result)
            }
        }else{
            console.log('No results found');
        }


    });

}



soptitythis = function( cmdsArrays){




}

moviethis = function( cmdsArrays){

    //http://www.omdbapi.com/?apikey=trilogy&t=titanic
    let KEY = 'trilogy';

    const axios = require('axios');

    let title =  cmdsArrays[1];

    let  url_movies = `http://www.omdbapi.com/?apikey=${KEY}&t=${title}`

    axios.get(url_movies).then(resp => {

        // console.log(resp.data);

        if (resp.data != ''  ){



            // console.log(resp.data);

            if (resp.data != '' && resp.data.Response!=='False' ){


                displaymovie(resp.data);



            }else{
                console.log('No results found');
            }

        }
    });



}


displaymovie = function (element){
   // let element = resp.data;

    let title= element.Title;
    let year= element.Released;
    let rating= element.imdbRating;
    let rotten= element.Ratings[1].Value;
    let country= element.Country;
    let language= element.Language;
    let plot= element.Plot;
    let actors= element.Actors;

    let resp=        `
         * Title of the movie : ${title}
        * Year the movie came out: ${year} 
        * IMDB Rating of the movie: ${rating}
        * Rotten Tomatoes Rating of the movie: ${rotten} 
        * Country where the movie was produced ${country} 
        * Language of the movie : ${language} 
        * Plot of the movie: ${plot} 
        * Actors in the movie: ${actors}. `;

    console.log(resp);
}