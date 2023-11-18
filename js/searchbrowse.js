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

let sortColumn = null;
let sortDirection = 1;

const tableContainer = document.getElementById("table-container");
const table = document.createElement("table");

const headers = ["Title ^", "Artist ^", "Year ^", "Popularity ^", "Genre ^"];

function createHeaderCell(headerText, columnIndex) {
    const header = document.createElement("th");
    header.innerHTML = "<b>" + headerText + "</b>";
    header.addEventListener("click", function() {
        sortTable(columnIndex);
    });
    return header;
}

const headerRow = table.insertRow(0);
for (const headerText of headers) {
    headerRow.appendChild(createHeaderCell(headerText, headers.indexOf(headerText)));
}

function getColumnValue(song, columnIndex) {
    const column = ["title", "artist.name", "year", "details.popularity", "genre.name"];
    let value = song;
    for (const prop of column[columnIndex].split('.')) {
        value = value && value[prop];
    }
    return value;
}


function makeTable() {
    table.innerHTML = "";
    const headerRow = table.insertRow(0);
    for (const headerText of headers) {
        headerRow.appendChild(createHeaderCell(headerText, headers.indexOf(headerText)));
    }

    for (const song of songList) {
        const row = table.insertRow();
        for (const headerText of headers) {
            const cell = row.insertCell();
            cell.innerHTML = getColumnValue(song, headers.indexOf(headerText));
        }
    }

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}

makeTable();

function sortTable(columnIndex) {
    if (columnIndex === sortColumn) {
        sortDirection *= -1;
    } else {
        sortDirection = 1;
        sortColumn = columnIndex;
    }

    songList.sort(function(a, b) {
        const columnA = getColumnValue(a, columnIndex);
        const columnB = getColumnValue(b, columnIndex);
        return columnA < columnB ? -sortDirection : (columnA > columnB ? sortDirection : 0);
    });

    makeTable();
}






     
   
 






