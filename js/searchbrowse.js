// search browse songs 

// Milestone 2 (due Nov 17). Implement part of the Search/Browse Songs view. You must
// have the artist and genre select lists displaying the data in the provided json files. As well,
// display the song list (title, artist name, year, genre name, popularity) using the provided
// sample-songs.json data. Implement the column sort as well. To submit your milestone,
// simply email me with the URL of the home page of the site on github pages.








document.addEventListener("DOMContentLoaded", function () {
  const selectArtists = document.createElement('select');
  const selectGenres = document.createElement('select');
  const tableContainer = document.createElement('div');
  const loader = document.createElement('div');
  loader.textContent = 'Loading...';

  document.body.appendChild(selectArtists);
  document.body.appendChild(selectGenres);
  document.body.appendChild(tableContainer);
  document.body.appendChild(loader);

  const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const songs = Array.isArray(data) ? data : [];

      // Extract unique artists
      const artists = [...new Set(songs.map(song => song.artist.name))];
      // Extract unique genres
      const genres = [...new Set(songs.map(song => song.genre.name))];

      // Populate select dropdown for artists
      artists.forEach(artist => {
        const optionArtist = document.createElement('option');
        optionArtist.textContent = artist;
        selectArtists.appendChild(optionArtist);
      });

      // Populate select dropdown for genres
      genres.forEach(genre => {
        const optionGenre = document.createElement('option');
        optionGenre.textContent = genre;
        selectGenres.appendChild(optionGenre);
      });

      // Create and sort the table
      makeTable(songs);

      headers.forEach((header, index) => {
        const headerCell = headerRow.cells[index];
        headerCell.addEventListener('click', function () {
          sortTable(index);
        });
      });

      loader.style.display = 'none';
      tableContainer.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      loader.textContent = 'Error fetching data';
    });
});





//data fetching through url 


// document.addEventListener("DOMContentLoaded", function () {

//   const select = document.createElement('select');
//   // const loader = document.createElement('div');
//   // loader.textContent = 'Loading...';

  
//   document.body.appendChild(select);
//   // document.body.appendChild(loader);

//   const artistAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

//   fetch(artistAPI)
//     .then(response => response.json())
//     .then(content => {
//       const songs = Array.isArray(content) ? content : [];

//       songs.forEach(song => {
//         const option = document.createElement('option');
//         option.textContent = song.artist.name;
//         select.appendChild(option);
//       });

      
//       // loader.style.display = 'none';
     
//       // select.style.display = 'block';
//     })
//     .catch(error => {
//       console.error('Error fetching artists:', error);
//     });
// });








//artist dropdown
// document.write("<h2>Selecting Artists</h2>");
// const artists = JSON.parse(content);
// function outputArtist(artist) {
//     document.write(`<option value="${artist.id}">${artist.name}">${artist.type}</option>`);
//   }
  
//   document.write(`<select id="artistSelect">`);
//   for (let artist of artists) {
//     outputArtist(artist);
//   }
//   document.write(`</select>`);


//   //genre dropdown url 

// const heading = document.createElement('h3');
// heading.textContent = 'Selecting Genres';

// document.addEventListener("DOMContentLoaded", function () {
 
//   const select = document.createElement('select');
//   // const loader = document.createElement('div');
//   // loader.textContent = 'Loading...';

  
//   document.body.appendChild(select);
//   // document.body.appendChild(loader);

//   const genreAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


//   fetch(genreAPI)
//     .then(response => response.json())
//     .then(content => {
//       const songs = Array.isArray(content) ? content : [];

//       songs.forEach(song => {
//         const option = document.createElement('option');
//         option.textContent = song.genre.name;
//         select.appendChild(option);
//       });

      
//       // loader.style.display = 'none';
    
//       // select.style.display = 'block';
//     })
//     .catch(error => {
//       console.error('Error fetching genres:', error);
//     });
// });



//   document.write("<h2>Selecting Genres</h2>");
// const genres=JSON.parse(tempGenres);
// function outputArtist(genre) {
//     document.write(`<option value="${genre.id}">${genre.name}</option>`);
//   }
  

//   document.write(`<select id="genreSelect">`);
//   for (let genre of genres) {
//     outputArtist(genre);
//   }
//   document.write(`</select>`);



//songs using url 


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

function makeTable(songs) {
    table.innerHTML = "";
    const headerRow = table.insertRow(0);
    for (const headerText of headers) {
        headerRow.appendChild(createHeaderCell(headerText, headers.indexOf(headerText)));
    }

    for (const song of songs) {
        const row = table.insertRow();
        for (const headerText of headers) {
            const cell = row.insertCell();
            cell.innerHTML = getColumnValue(song, headers.indexOf(headerText));
        }
    }

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}

function sortTable(columnIndex) {
    if (sortColumn === null) {
        sortColumn = columnIndex;
    } else if (sortColumn === columnIndex) {
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

    makeTable(songList);
}

// const url = "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";

// fetch(url)
//     .then(response => response.json())
//     .then(songs => {
//         songList = songs; 
//         makeTable(songs);

//         headers.forEach((header, index) => {
//             const headerCell = headerRow.cells[index];
//             headerCell.addEventListener("click", function() {
//                 sortTable(index);
//             });
//         });
//     })
//     .catch(error => console.error("Error fetching data:", error));



//songs
// const songList = JSON.parse(songsFile);

// let sortColumn = null;
// let sortDirection = 1;

// const tableContainer = document.getElementById("table-container");
// const table = document.createElement("table");

// const headers = ["Title ^", "Artist ^", "Year ^", "Popularity ^", "Genre ^"];

// function createHeaderCell(headerText, columnIndex) {
//     const header = document.createElement("th");
//     header.innerHTML = "<b>" + headerText + "</b>";
//     header.addEventListener("click", function() {
//         sortTable(columnIndex);
//     });
//     return header;
// }

// const headerRow = table.insertRow(0);
// for (const headerText of headers) {
//     headerRow.appendChild(createHeaderCell(headerText, headers.indexOf(headerText)));
// }

// function getColumnValue(song, columnIndex) {
//     const column = ["title", "artist.name", "year", "details.popularity", "genre.name"];
//     let value = song;
//     for (const prop of column[columnIndex].split('.')) {
//         value = value && value[prop];
//     }
//     return value;
// }


// function makeTable() {
//     table.innerHTML = "";
//     const headerRow = table.insertRow(0);
//     for (const headerText of headers) {
//         headerRow.appendChild(createHeaderCell(headerText, headers.indexOf(headerText)));
//     }

//     for (const song of songList) {
//         const row = table.insertRow();
//         for (const headerText of headers) {
//             const cell = row.insertCell();
//             cell.innerHTML = getColumnValue(song, headers.indexOf(headerText));
//         }
//     }

//     tableContainer.innerHTML = "";
//     tableContainer.appendChild(table);
// }

// makeTable();

// function sortTable(columnIndex) {
//     if (columnIndex === sortColumn) {
//         sortDirection *= -1;
//     } else {
//         sortDirection = 1;
//         sortColumn = columnIndex;
//     }

//     songList.sort(function(a, b) {
//         const columnA = getColumnValue(a, columnIndex);
//         const columnB = getColumnValue(b, columnIndex);
//         return columnA < columnB ? -sortDirection : (columnA > columnB ? sortDirection : 0);
//     });

//     makeTable();
// }






     
   
 






