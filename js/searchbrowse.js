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
  
  const song = JSON.parse(songs);
  
  function displaySongDetails(songView) {
    document.write(`
    <div style="width: 45%; display: inline-block; margin: 10px; padding: 10px; border: 1px solid #ccc;">
            <p>Title: ${songView.title}</p>
            <p>Artist: ${songView.artist}</p>
            <p>Year: ${songView.year}</p>
            <p>Genre: ${songView.genre}</p>
            <p>Popularity: ${songView.details}</p>
        </div>
`
        
    );
}

document.write(`<p>`);
  for (let songviews of song) {
    displaySongDetails(song);
  }
  document.write(`</p>`);






//   document.querySelector('body') .addEventListener('click', function (e) {
//     // verify user has clicked on image within <main>
// if (e.target && e.target.nodeName.toLowerCase() == 'img') {
// populateAside(e); }
// } );

//   function populateAside(e) {
//     // determine the clicked symbol name from clicked image
// let clickedSymbolName = e.target.getAttribute('title');
//     // search through stocks array looking for symbol that matches
// const foundSymbol = stocks.find(function(element) {
// return element.symbol === clickedSymbolName; });
//     // display aside (hidden initially)
// let aside = document.querySelector('aside'); aside.style.display = 'block';
// let logo = document.querySelector('#logo img');
//  let symbol = document.querySelector('#symbol'); 
//  let name = document.querySelector('#name');
// let sector = document.querySelector('#sector'); 
// let sub = document.querySelector('#sub');
//      // populate table with data
// logo.setAttribute('src', `images/logos/${foundSymbol.symbol}.svg`);
// symbol.textContent = foundSymbol.symbol; 
// name.textContent = foundSymbol.name; 
// sector.textContent = foundSymbol.sector; 
// sub.textContent = foundSymbol.subIndustry;
// }




