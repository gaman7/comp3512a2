//play list view page 
document.addEventListener("DOMContentLoaded", function () {
    const playlistContainer = document.getElementById("playlist-container");

    // Retrieve selected songs from local storage
    const selectedSongs = JSON.parse(localStorage.getItem('selectedSongs')) || [];

    // Create a table to display the selected songs
    const playlistTable = document.createElement("table");
    const headerRow = playlistTable.insertRow(0);

    const headers = ["Title", "Artist", "Year", "Popularity", "Genre"];

    for (const headerText of headers) {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    }

    // Populate the table with selected songs
    for (const title of selectedSongs) {
        const song = getSongByTitle(title); // Assuming you have a function to retrieve song details by title
        if (song) {
            const row = playlistTable.insertRow();
            const values = [song.title, song.artist.name, song.year, song.details.popularity, song.genre.name];

            for (const value of values) {
                const cell = row.insertCell();
                cell.textContent = value;
            }
        }
    }

    playlistContainer.appendChild(playlistTable);

    function getSongByTitle(title) {
        // Retrieve song details from the stored data
        const songData = JSON.parse(localStorage.getItem('songData')) || [];
        return songData.find(song => song.title === title);
    }
});



