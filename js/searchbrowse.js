// search browse songs 

// Milestone 2 (due Nov 17). Implement part of the Search/Browse Songs view. You must
// have the artist and genre select lists displaying the data in the provided json files. As well,
// display the song list (title, artist name, year, genre name, popularity) using the provided
// sample-songs.json data. Implement the column sort as well. To submit your milestone,
// simply email me with the URL of the home page of the site on github pages.

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
console.log(songList);

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

 


  // Get the container to append the table
const tableContainer = document.getElementById("table-container");

// Create a table element
const table = document.createElement("table");

// Create table header
const headerRow = table.insertRow(0);
const titleHeader = headerRow.insertCell(0);
titleHeader.innerHTML = "<b>Title</b>";
const artistHeader = headerRow.insertCell(1);
artistHeader.innerHTML = "<b>Artist</b>";
const yearHeader = headerRow.insertCell(2);
yearHeader.innerHTML = "<b>Year</b>";
const popHeader = headerRow.insertCell(3);
popHeader.innerHTML = "<b>Popularity</b>";
const genreHeader = headerRow.insertCell(4);
genreHeader.innerHTML = "<b>Genre</b>";


// Iterate through each song and add a row to the table
for (let i = 0; i < songList.length; i++) {
    const song = songList[i];
    const row = table.insertRow(i + 1);
    const titleCell = row.insertCell(0);
    titleCell.innerHTML = song.title;
    const artistCell = row.insertCell(1);
    artistCell.innerHTML = song.artist.name;
    const yearCell = row.insertCell(2);
    yearCell.innerHTML = song.year;
    const popularity = row.insertCell(3);
    popularity.innerHTML = song.details.popularity;
    const genre = row.insertCell(4);
    genre.innerHTML = song.genre.name;

}

// Append the table to the container
tableContainer.appendChild(table);


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







