// search browse songs 

//artist dropdown
document.write("<h2>Selecting Artists</h2>");
const artists = JSON.parse(content);
function outputArtist(artist) {
    document.write(`<option value="${artist.id}">${artist.name}">${artist.type}</option>`);
  }
  
  document.write(`<select id="artistSelect">`);
  for (let artist of artists) {
    outputArtist(artist);
  }
  document.write(`</select>`);


  //genre dropdown
  document.write("<h2>Selecting Genres</h2>");
const genres=JSON.parse(tempGenres);
function outputArtist(genre) {
    document.write(`<option value="${genre.id}">${genre.name}</option>`);
  }
  

  document.write(`<select id="genreSelect">`);
  for (let genre of genres) {
    outputArtist(genre);
  }
  document.write(`</select>`);

//songs
document.write("<h2>Browse/Search result</h2>");
const songList = JSON.parse(songsFile);

  function outputSongs(song){
    document.write(`<option value="${song.song_id}">${song.title}</option>`);
  }

  document.write(`<select id="songSelect">`);
  for (let song of songList) {
    outputSongs(song);
  }
  document.write(`</select>`);
  
  function displaySongDetails(songView) {
    document.write(`
    <div style="width: 45%; display: inline-block; margin: 10px; padding: 10px; border: 1px solid #ccc;">
            <p>Title: ${songView.title}</p>
            <p>Artist: ${songView.artist.name}</p>
            <p>Year: ${songView.year}</p>
            <p>Genre: ${songView.genre.name}</p>
            <p>Popularity: ${songView.details.popularity}</p>
        </div>
`
        
    );
}

document.write(`<p id="songSelect">`);

  for (let songviews of songList) {
    displaySongDetails(songviews);
    console.log(songviews);
  }
  document.write(`</p>`);


 // const songList = JSON.parse(songsFile);


     
   
   
//  const genres=JSON.parse(tempGenres);
// document.addEventListener("DOMContentLoaded", function(){
// const main = document.querySelector('main');

   

// document.write(`<select id="genreSelect">`);
// document.write("<h2>Selecting Genres</h2>");

// for (let genre of genres) {
//   //genre dropdown

//   function outputArtist(genre) {
//     let option = document.createElement('option');
//     option.setAttribute('value')
//     option = document.write(`<option value="${genre.id}">${genre.name}</option>`);
//     option.setAttribute('title', songList.title);
//     }
//   outputArtist(genre);
// }

// document.write(`</select>`);
// }
// );

// document.querySelector('main').addEventListener('click', function(s){
//   if (s.target && s.target.nodeName.toLowerCase() == '#title'){
//     populateAside(s);
//   }

// }
// );

// function populateAside(s){
//   let clickedGenre = s.target.getAttribute('title');
//   const foundGenre = songList.find(function(element){
//     return element.genre.name === clickedGenre;
//   });

//   console.log(s);
// }







