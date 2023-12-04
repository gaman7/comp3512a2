//play list view page 
document.addEventListener("DOMContentLoaded", function () {
    const selectedSongs = JSON.parse(localStorage.getItem('selectedSongs')) || [];
    displaySelectedSongs(selectedSongs);
});

function displaySelectedSongs(songs) {
    const playlistContainer = document.getElementById("playlist-container");

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const headers = ["Title", "Artist", "Year", "Popularity", "Genre"];
    
    // Create table headers
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Create table rows for selected songs
    songs.forEach(song => {
        const row = table.insertRow();
        const columns = ["title", "artist", "year", "popularity", "genre"];

        columns.forEach(column => {
            const cell = row.insertCell();
            cell.textContent = song[column];
        });
    });

    playlistContainer.appendChild(table);
}



