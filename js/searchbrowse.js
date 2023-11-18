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

  ////////////

//  // Get the container to append the table
// const tableContainer = document.getElementById("table-container");

// // Create a table element
// const table = document.createElement("table");

// // Create table header
// const headerRow = table.insertRow(0);
// const headers = ["Title", "Artist", "Year", "Popularity", "Genre"];

// for (const headerText of headers) {
//     const header = document.createElement("th");
//     header.innerHTML = `<b>${headerText}</b>`;
//     headerRow.appendChild(header);
// }

// // Iterate through each song and add a row to the table
// for (const song of songList) {
//     const row = table.insertRow();
//     const cells = [song.title, song.artist.name, song.year, song.details.popularity, song.genre.name];

//     for (const cellData of cells) {
//         const cell = row.insertCell();
//         cell.innerHTML = cellData;
//     }
//   }

// // Append the table to the container
// tableContainer.appendChild(table);


let sortColumn = null;
let sortDirection = 1; // 1 for ascending, -1 for descending

const tableContainer = document.getElementById("table-container");
const table = document.createElement("table");

const headerRow = table.insertRow(0);
const headers = ["Title", "Artist", "Year", "Popularity", "Genre"];

for (let i = 0; i < headers.length; i++) {
    const header = document.createElement("th");
    header.innerHTML = `<b>${headers[i]}</b>`;
    header.addEventListener("click", () => sortTable(i));
    headerRow.appendChild(header);
}

function sortTable(columnIndex) {
    if (columnIndex === sortColumn) {
        // If clicking on the same column, reverse the sort direction
        sortDirection *= -1;
    } else {
        // If clicking on a different column, reset the sort direction
        sortDirection = 1;
        sortColumn = columnIndex;
    }

    songList.sort((a, b) => {
        const columnA = getColumnValue(a, columnIndex);
        const columnB = getColumnValue(b, columnIndex);

        // Compare values based on the sort direction
        if (columnA < columnB) return -sortDirection;
        if (columnA > columnB) return sortDirection;
        return 0;
    });

    // Redraw the table after sorting
    renderTable();
}

function getColumnValue(song, columnIndex) {
    switch (columnIndex) {
        case 0: return song.title;
        case 1: return song.artist.name;
        case 2: return song.year;
        case 3: return song.details.popularity;
        case 4: return song.genre.name;
        default: return null;
    }
}

function renderTable() {
    // Clear the existing table
    table.innerHTML = "";

    // Rebuild the table with the sorted data
    const headerRow = table.insertRow(0);
    headers.forEach((headerText, i) => {
        const header = document.createElement("th");
        header.innerHTML = `<b>${headerText}</b>`;
        header.addEventListener("click", () => sortTable(i));
        headerRow.appendChild(header);
    });

    for (const song of songList) {
        const row = table.insertRow();
        const cells = [song.title, song.artist.name, song.year, song.details.popularity, song.genre.name];

        for (const cellData of cells) {
            const cell = row.insertCell();
            cell.innerHTML = cellData;
        }
    }

    tableContainer.innerHTML = ""; // Clear the container
    tableContainer.appendChild(table); // Append the sorted table
}

// Initial rendering of the table
renderTable();

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







