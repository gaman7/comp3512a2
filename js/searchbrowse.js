
//recent version 

document.addEventListener("DOMContentLoaded", function () {

    const tableContainer = this.getElementById("table-container");
    const dropdown = this.getElementById("dropdown");

    const selectArtists = document.createElement('select');
    const selectGenres = document.createElement('select');
    const loader = document.createElement('div');
    loader.textContent = 'Loading...';

    dropdown.appendChild(selectArtists);
    dropdown.appendChild(selectGenres);
    dropdown.appendChild(loader);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', function () {
        window.location.href = 'js/playListView.js'; 
    });
    dropdown.appendChild(addButton);
  
    const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
  
    let songs = []; // Declare the variable outside the function
    let sortColumn = null;
    let sortDirection = 1;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Store data in localStorage for future use
        localStorage.setItem('songData', JSON.stringify(data));
  
        // Assign the data to the songs variable
        songs = Array.isArray(data) ? data : [];
  
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
  
    const headers = ["Title ^", "Artist ^", "Year ^", "Popularity ^", "Genre ^"];
    const table = document.createElement("table");
    const headerRow = table.insertRow(0);
  
    function createHeaderCell(headerText, columnIndex) {
      const header = document.createElement("th");
      header.innerHTML = "<b>" + headerText + "</b>";
      header.addEventListener("click", function() {
        sortTable(columnIndex);
      });
      return header;
    }
  
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
  
      songs.sort(function(a, b) {
        const columnA = getColumnValue(a, columnIndex);
        const columnB = getColumnValue(b, columnIndex);
        return columnA < columnB ? -sortDirection : (columnA > columnB ? sortDirection : 0);
      });
  
      makeTable(songs);
    }
  });
  





     
   
 






