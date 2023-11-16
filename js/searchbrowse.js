// search browse songs 
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


  document.write("<h2>Selecting Genres</h2>");

  document.write(`<p Selecting Genres >`);

const genres=JSON.parse(tempGenres);
function outputArtist(genre) {
    
    document.write(`<option value="${genre.id}">${genre.name}</option>`);
  }
  

  document.write(`<select id="genreSelect">`);

  for (let genre of genres) {
    outputArtist(genre);
  }
  




