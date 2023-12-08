// //version 2 
document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");
    const playlistContainer = document.getElementById("playlist-container");
    const dropdown = document.getElementById("dropdown");

    const selectArtists = document.createElement('select');
    const selectGenres = document.createElement('select');

    const radioGenres = document.createElement('input');
    radioGenres.type = 'radio';
    radioGenres.name = 'filterType';
    radioGenres.value = 'genres';
    radioGenres.id = 'radioGenres';
    const labelGenres = document.createElement('label');
    labelGenres.textContent = 'Genres';
    labelGenres.htmlFor = 'radioGenres';

    const radioArtists = document.createElement('input');
    radioArtists.type = 'radio';
    radioArtists.name = 'filterType';
    radioArtists.value = 'artists';
    radioArtists.id = 'radioArtists';
    const labelArtists = document.createElement('label');
    labelArtists.textContent = 'Artists';
    labelArtists.htmlFor = 'radioArtists';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Filter by Title';
    titleInput.id = 'titleFilter';
    const titleRadio = document.createElement('input');
    titleRadio.type = 'radio';
    titleRadio.name = 'filterType';
    titleRadio.value = 'title';
    titleRadio.id = 'radioTitle';



    const loader = document.createElement('div');
    loader.textContent = 'Loading...';

    dropdown.appendChild(radioGenres);
    dropdown.appendChild(labelGenres);
    dropdown.appendChild(radioArtists);
    dropdown.appendChild(labelArtists);
    dropdown.appendChild(selectArtists);
    dropdown.appendChild(selectGenres);
    dropdown.appendChild(titleInput);
    dropdown.appendChild(titleRadio);
    dropdown.appendChild(loader);


    const filterButton = document.createElement('button');
    filterButton.textContent = 'Filter';
    filterButton.addEventListener('click', function () {
        applyFilter();
    });
    dropdown.appendChild(filterButton);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', function () {
        clearSelection();
    });
    dropdown.appendChild(clearButton);

    function toggleRowSelection(row) {
        row.classList.toggle("selected");
    }

    tableContainer.addEventListener("click", function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === "TD" && clickedElement.parentNode.tagName === "TR") {
            toggleRowSelection(clickedElement.parentNode);
        }
    });

    const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

    let songs = []; // Declare the variable outside the function
    let sortColumn = null;
    let sortDirection = 1;

    let songStorage=localStorage.getItem("songs");
    if(songStorage){
        songs.push(...JSON.parse(songStorage));

    }

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
        header.addEventListener("click", function () {
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
    
            // Add an event listener to each row for transitioning to Single Song View
            row.addEventListener('click', function () {
                hideSearchPage();
                showSingleSongView(song);
            });
    
            for (const headerText of headers) {
                const cell = row.insertCell();
                cell.innerHTML = getColumnValue(song, headers.indexOf(headerText));
                cell.dataset.songId = song.song_id; // Set the dataset for the song ID
            }
    
            const addButton = document.createElement('button');
            addButton.textContent = 'Add';
            addButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent the row click from being triggered
                const selectedSongs = [song.song_id];
                addToPlaylist(selectedSongs);
                hideSearchPage();
            });
            row.appendChild(addButton);
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

        songs.sort(function (a, b) {
            const columnA = getColumnValue(a, columnIndex);
            const columnB = getColumnValue(b, columnIndex);
            return columnA < columnB ? -sortDirection : (columnA > columnB ? sortDirection : 0);
        });

        applyFilter();
    }

    function toggleSelected(cell) {
        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
        } else {
            cell.classList.add('selected');
        }
    }

    function getSelectedSongs() {
        const selectedCells = document.querySelectorAll('.selected');
        const selectedSongIds = Array.from(selectedCells).map(cell => cell.dataset.songId);
        return selectedSongIds;
     
    }


    function addToPlaylist(selectedSongs) {

    const playlistTable = document.getElementById("playlist-table");

    for (const songId of selectedSongs) {
        const song = songs.find(song => song.song_id == songId);

        if (song) {
            const row = playlistTable.insertRow();

            row.addEventListener('click', function () {
                showSingleSongView(song);
            });

            const keysToDisplay = ["title", "year", "artist.name", "details.popularity", "genre.name"];

            keysToDisplay.forEach(key => {
                const cell = row.insertCell();
                const keyParts = key.split('.');
                let value = song;
                for (const part of keyParts) {
                    value = value && value[part];
                }
                cell.innerHTML = value || "";
            });

           
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeSongFromPlaylist(row);
            });
            const removeCell = row.insertCell();
            removeCell.appendChild(removeButton);

         
        }
    }

    
}

function removeSongFromPlaylist(row) {
    const playlistTable = document.getElementById("playlist-table");
    playlistTable.deleteRow(row.rowIndex);
}

function hidePlaylistView() {
    playlistContainer.style.display = 'none';
}

    function showSingleSongView(song){
        hidePlaylistView();
        const singleSongContainer = document.getElementById("single-song-container");

        
        const titleElement = document.createElement('p');
        titleElement.textContent ="Title:"+ song.title;

        const artistElement = document.createElement('p');
        artistElement.textContent = "Artist: " + song.artist.name;

        const yearElement = document.createElement('p');
        yearElement.textContent = "Year: " + song.year;

        const artistType=document.createElement('p');
        artistType.textContent="ArtistType: "+song.artist.id;

        const genre=document.createElement('p');
        genre.textContent="Genre:"+song.genre.name;

        const duration=document.createElement('p');
        duration.textContent="Duration:"+song.details.duration;

       
        singleSongContainer.appendChild(titleElement);
        singleSongContainer.appendChild(artistElement);
        singleSongContainer.appendChild(yearElement);
        singleSongContainer.appendChild(artistType);
        singleSongContainer.appendChild(genre);
        singleSongContainer.appendChild(duration);
        
        singleSongContainer.style.display = 'block';

    }




    function hideSearchPage() {
        tableContainer.style.display = 'none';
        dropdown.style.display = 'none';
        playlistContainer.style.display = 'block';
    }



        function applyFilter() {
        const selectedFilterType = document.querySelector('input[name="filterType"]:checked').value;

       
        const titleFilter = titleInput.value.toLowerCase();
    
        
        let selectedValue;
        if (selectedFilterType === 'genres') {
            selectedValue = selectGenres.value;
        } else if (selectedFilterType === 'artists') {
            selectedValue = selectArtists.value;
        } else if (selectedFilterType === 'title') {
            
            selectedValue = '';
        }
    
        
        let filteredSongs = songs;
    
        if (selectedFilterType !== 'title' && selectedValue) {
            filteredSongs = filteredSongs.filter(song => {
                if (selectedFilterType === 'genres') {
                    return song.genre.name === selectedValue && song.title.toLowerCase().includes(titleFilter);
                } else if (selectedFilterType === 'artists') {
                    return song.artist.name === selectedValue && song.title.toLowerCase().includes(titleFilter);
                }
            });
        } else if (selectedFilterType === 'title') {
           
            filteredSongs = filteredSongs.filter(song => song.title.toLowerCase().includes(titleFilter));
        }
    
        makeTable(filteredSongs);
    
        tableContainer.style.display = filteredSongs.length > 0 ? 'block' : 'none';
    }

    

        function clearSelection() {
        const selectedCells = document.querySelectorAll('.selected');
        selectedCells.forEach(cell => cell.classList.remove('selected'));

        document.querySelector('input[name="filterType"]:checked').checked = false;
        titleInput.value = ''; 
        tableContainer.innerHTML = '';

        // makeTable(songs); because we do not need it 
    }


    
});











       











