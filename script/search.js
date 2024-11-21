// Selezione degli elementi
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')

// Funzione per cercare dati dall'API di Deezer
async function searchMusic(query) {
  if (!query) {
    searchResults.style.display = 'none' // Nasconde i risultati se la query è vuota
    return
  }

  // Effettua la richiesta all'API
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('No ok')
      }
    })
    .then((data) => {
      const filteredTracks = data.data

      // Mostra i risultati combinati (tracce e album)
      if (filteredTracks.length === 0) {
        searchResults.innerHTML =
          '<p class="text-white">Nessun risultato trovato.</p>'
        searchResults.style.display = 'block'
      } else {
        displayResults([...filteredTracks])
      }
    })
    .catch((error) => {
      console.error('Errore durante la ricerca:', error)
      searchResults.innerHTML =
        '<p class="text-white">Errore durante la ricerca. Riprova.</p>'
      searchResults.style.display = 'block' // il messaggio di errore
    })
}

// Funzione per visualizzare i risultati
function displayResults(results) {
  searchResults.style.display = 'block' // Rende visibili i risultati
  searchResults.innerHTML = '' // ellimina i risultati precedenti

  if (results.length === 0) {
    searchResults.innerHTML =
      '<p class="text-white">Nessun risultato trovato.</p>'
    return
  }

  // Aggiungi ogni risultato al contenitore
  results.forEach((result) => {
    const resultItem = document.createElement('div')
    resultItem.style.display = 'flex'
    resultItem.style.alignItems = 'center'
    resultItem.style.marginBottom = '10px'

    // Immagine (artista o album)
    const img = document.createElement('img')
    img.src = result.album.cover_small
    img.alt = result.album.name
      ? `${result.artist.name} Picture`
      : `${result.album.title} Cover`
    img.style.width = '50px'
    img.style.height = '50px'
    img.style.marginRight = '10px'
    img.style.borderRadius = '5px'

    // Dettagli del risultato
    const details = document.createElement('div')
    details.style.display = 'flex'
    details.style.flexDirection = 'column'

    // Titolo del risultato
    const title = document.createElement('p')
    title.textContent = `${result.title}`
    title.style.margin = '0'
    title.style.color = 'white'
    title.style.fontSize = '14px'

    // Artista
    const artist = document.createElement('p')
    artist.textContent = `Artista: ${result.artist.name}`
    artist.style.margin = '0'
    artist.style.color = 'gray'
    artist.style.fontSize = '12px'

    // Append dei dettagli
    details.appendChild(title)
    details.appendChild(artist)
    resultItem.appendChild(img)
    resultItem.appendChild(details)

    // Event listener al click
    artist.addEventListener('click', () => {
      window.location.href = `./artista.html?id=${result.artist.id}`
    })
    title.addEventListener('click', () => {
      window.location.href = `./album.html?id=${result.album.id}`
    })

    // Aggiungi l'elemento al contenitore
    searchResults.appendChild(resultItem)
  })
}

// Event listener sull'input di ricerca
searchInput.addEventListener('input', (e) => {
  const query = searchInput.value.trim()
  if (query === '') {
    searchResults.style.display = 'none' // Nasconde i risultati se non c'è nulla scritto
  } else {
    searchMusic(query) // Chiama la funzione di ricerca
  }
})
