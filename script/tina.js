// Selezione degli elementi 
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Funzione per cercare dati dall'API di Deezer
async function searchMusic(query) {
  if (!query) {
    searchResults.style.display = 'none'; // Nasconde i risultati se la query è vuota
    return;
  }

  try {
    // Effettua la richiesta all'API 
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Filtra i risultati per tracce e album
    const filteredTracks = data.data.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );
    const filteredAlbums = data.data.filter(result =>
      result.album.title.toLowerCase().includes(query.toLowerCase())
    );

    // Mostra i risultati combinati (tracce e album)
    if (filteredTracks.length === 0 && filteredAlbums.length === 0) {
      searchResults.innerHTML = '<p class="text-white">Nessun risultato trovato.</p>';
      searchResults.style.display = 'block'; 
    } else {
      displayResults([...filteredTracks, ...filteredAlbums]); 
    }
  } catch (error) {
    console.error('Errore durante la ricerca:', error);
    searchResults.innerHTML = '<p class="text-white">Errore durante la ricerca. Riprova.</p>';
    searchResults.style.display = 'block'; // il messaggio di errore
  }
}

// Funzione per visualizzare i risultati
function displayResults(results) {
  searchResults.style.display = 'block'; // Rende visibili i risultati
  searchResults.innerHTML = ''; // ellimina i risultati precedenti

  if (results.length === 0) {
    searchResults.innerHTML = '<p class="text-white">Nessun risultato trovato.</p>';
    return;
  }

  // Aggiungi ogni risultato al contenitore
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.style.display = 'flex';
    resultItem.style.alignItems = 'center';
    resultItem.style.marginBottom = '10px';

    // Determina se è una traccia o un album
    const isTrack = result.type === 'track';

    // Immagine (artista o album)
    const img = document.createElement('img');
    img.src = isTrack ? result.artist.picture_small : result.album.cover_small;
    img.alt = isTrack ? `${result.artist.name} Picture` : `${result.album.title} Cover`;
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.marginRight = '10px';
    img.style.borderRadius = '5px';

    // Dettagli del risultato
    const details = document.createElement('div');
    details.style.display = 'flex';
    details.style.flexDirection = 'column';

    // Titolo del risultato
    const title = document.createElement('p');
    title.textContent = `${result.title} (${isTrack ? 'Traccia' : 'Album'})`;
    title.style.margin = '0';
    title.style.color = 'white';
    title.style.fontSize = '14px';

    // Artista
    const artist = document.createElement('p');
    artist.textContent = `Artista: ${isTrack ? result.artist.name : 'N/A'}`;
    artist.style.margin = '0';
    artist.style.color = 'gray';
    artist.style.fontSize = '12px';

    // Append dei dettagli
    details.appendChild(title);
    details.appendChild(artist);
    resultItem.appendChild(img);
    resultItem.appendChild(details);

    // Event listener al click
    resultItem.addEventListener('click', () => {
      alert(`Hai selezionato: ${result.title} di ${isTrack ? result.artist.name : result.album.title}`);
    });

    // Aggiungi l'elemento al contenitore
    searchResults.appendChild(resultItem);
  });
}

// Event listener sull'input di ricerca
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query === '') {
    searchResults.style.display = 'none'; // Nasconde i risultati se non c'è nulla scritto
  } else {
    searchMusic(query); // Chiama la funzione di ricerca
  }
});
