const url = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const addressBarContent = new URLSearchParams(window.location.search)
const id = addressBarContent.get('id')

const albumDivMd = document.getElementById('album-top-md')
const albumDivSm = document.getElementById('album-top-sm')
const albumRowSM = document.getElementById('album-row-sm')
const albumData = document.getElementById('album-data')
const recommended = document.getElementById('recommended')
const background = document.getElementById('background')
let bandName = ''
let url2 = ''

fetch(url + id)
  .then((response) => {
    console.log(response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('No ok')
    }
  })
  .then((album) => {
    console.log(album)
    bandName = `${album.artist.name}`
    const releaseDate = new Date(album.release_date).getFullYear()
    const albumMinutes = Math.floor(album.duration / 60)
    const albumSeconds = album.duration - albumMinutes * 60

    albumDivMd.innerHTML = `<img class="bg-color" style="width:150px;height:150px" crossorigin='anonymous' src='${album.cover_big}' onload="start()">
    <div class="ms-3 d-flex flex-column justify-content-between">
    <div>
    <h6 class="small-text">ALBUM</h6>
    <h2 class="fw-bold">${album.title}</h2>
    </div>
    <div class="d-flex">
    <a class="d-flex text-decoration-none text-white" href="./artista.html?id=${album.artist.id}"><img class="rounded-circle" style="width:25px" src="${album.artist.picture_small}">
    <p class="mb-0 ms-1">${album.artist.name}</p></a>
    <p class="mb-0 ms-1">·</p>
    <p class="mb-0 ms-1 small align-self-center">${releaseDate}</p>
    <p class="mb-0 ms-1">·</p>
    <p class="mb-0 ms-1 small align-self-center">${album.nb_tracks} brani,<span class="opacity-50"> ${albumMinutes} minuti e ${albumSeconds} secondi</span></p>
    </div>
    </div>
    `
    albumDivSm.innerHTML = `<img crossorigin='anonymous' src=${album.cover_big}  class="mx-auto w-50 bg-color"> 
    <div class="ms-3 d-flex flex-column justify-content-between">
    <div>
    <h2 class="fw-bold mt-3">${album.title}</h2>
    </div>
    <div class="d-flex">
    <a class="d-flex text-decoration-none text-white" href="./artista.html?id=${album.artist.id}"><img class="rounded-circle" style="width:25px" src="${album.artist.picture_small}">
    <p class="mb-0 ms-2">${album.artist.name}</p></a>
    </div>
    <div class="d-flex mt-1">
    <p class="mb-0 small align-self-center opacity-75">Album</p>
    <p class="mb-0 ms-1 opacity-75">·</p>
    <p class="mb-0 ms-1 small align-self-center opacity-75">${releaseDate}</p>
    </div>
    </div>
    `
    let nSong = album.nb_tracks
    nSong > 25 ? (nSong = 25) : nSong
    for (let i = 0; i < nSong; i++) {
      const trackMinutes = Math.floor(album.tracks.data[i].duration / 60)
      let trackSeconds = album.tracks.data[i].duration - trackMinutes * 60
      trackSeconds < 10 ? (trackSeconds = '0' + trackSeconds) : trackSeconds
      const newRow = document.createElement('div')
      newRow.classList.add('d-flex', 'text-white', 'mt-3')
      newRow.innerHTML = `
      <div class="col col-11 col-md-7">
      <div class="d-flex">
        <p class="d-none d-md-block mb-0 me-3 mt-2 opacity-50">${i + 1}</p>
        <div>
          <p class="mb-0">${album.tracks.data[i].title}</p>
          <a class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover" href="./artista.html?id=${
            album.tracks.data[i].artist.id
          }"><p>${album.tracks.data[i].artist.name}</p></a>
        </div>
      </div>
      </div>
      <div class="col col-3 d-none d-md-block text-end"><p class="d-none d-md-block mb-0 opacity-50">${
        album.tracks.data[i].rank
      }</p></div>
      <div class="col col-1 col-md-2 text-end">
        <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
        <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
      </div>`
      albumRowSM.appendChild(newRow)
    }
    const albumDate = new Date(album.release_date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })
    albumData.innerHTML = `<p class="mb-0">${albumDate}</p>
    <p class="small-text">©${album.label}</p>`
    url2 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${bandName}`
    createRecommended()
  })
  .catch((err) => {
    console.log('errore', err)
  })

const createRecommended = function () {
  fetch(url2)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('No ok')
      }
    })
    .then((songs) => {
      console.log(songs)
      const newDiv = document.createElement('div')
      newDiv.innerHTML = `
      <a class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover" href="./artista.html?id=${songs.data[0].artist.id}"><p>Altro da ${bandName}</p></a>`
      recommended.appendChild(newDiv)
      for (let i = 1; i < 4; i++) {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-8', 'col-sm-6', 'col-md-4', 'mt-3')
        newCol.innerHTML = `
        <div class="card bg-sfondo text-white h-100">
           <img role="button" onclick="window.location.replace('album.html?id=${
             songs.data[i * 3].album.id
           }')" src="${
          songs.data[i * 3].album.cover_big
        }" class="card-img-top" alt="cover album">
           <div class="card-body">
               <h5 role="button" onclick="window.location.replace('album.html?id=${
                 songs.data[i * 3].album.id
               }')" class="card-title">${songs.data[i * 3].album.title}</h5>
            </div>
        </div>`
        recommended.appendChild(newCol)
      }
    })
    .catch((err) => {
      console.log('errore', err)
    })
}

// background color

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement('canvas')
  let c = canvas.getContext('2d')
  c.width = canvas.width = img.clientWidth
  c.height = canvas.height = img.clientHeight
  c.clearRect(0, 0, c.width, c.height)
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
  return c
}

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {}
  let pixels, r, g, b, a
  r = g = b = a = 0
  pixels = c.getImageData(0, 0, c.width, c.height)
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i]
    g = data[i + 1]
    b = data[i + 2]
    a = data[i + 3]
    if (a < 255 / 2) continue
    col = rgbToHex(r, g, b)
    if (!colors[col]) colors[col] = 0
    colors[col]++
  }
  return colors
}

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0
  let mostRecurrent = null
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor
      highestValue = colorMap[hexColor]
    }
  }
  return mostRecurrent
}

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw 'Invalid color component'
  } else {
    return ((r << 16) | (g << 8) | b).toString(16)
  }
}

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ('000000' + hex).slice(-6)
}

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReferences = document.querySelectorAll('.bg-color')
  let imgReference
  if (window.innerWidth < 768) {
    imgReference = imgReferences[0]
  } else {
    imgReference = imgReferences[1]
  }
  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference)

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context)

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors)

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent)

  background.style.background = `${'#' + mostRecurrentHex}`
  // console.log del risultato
  console.log(mostRecurrentHex)
}

// BARRA DI RIPRODUZIONE
// Elementi di sinistra
let track_art = document.querySelector('.track-art')
let track_name = document.querySelector('.track_name')
let track_artist = document.querySelector('.track-artist')

// Elementi centrali
let playpause_btn = document.querySelector('.playpause-track')
let next_btn = document.querySelector('.next-track')
let prev_btn = document.querySelector('.prev-track')
const randomIcon = document.querySelector('.random-track i')
const repeatIcon = document.querySelector('.repeat-track i')

// Tempo traccia
let seek_slider = document.querySelector('.seek_slider')
let volume_slider = document.querySelector('.volume_slider')
let curr_time = document.querySelector('.current-time')
let total_duration = document.querySelector('.total-duration')

// Traccia
let curr_track = document.createElement('audio')

// Variabili di stato
let track_index = 0 // Indice della traccia corrente
let isPlaying = false
let isRandom = false
let isRepeat = false
let tracks = [] // Lista delle tracce caricate dall'API

// Recupera i dati delle tracce dall'API
fetch(url + id)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero delle tracce.')
    }
  })
  .then((data) => {
    console.log(data)
    tracks = data.tracks.data
    loadTrack(track_index)
  })
  .catch((error) => {
    console.error('Errore:', error)
  })

// Carica una traccia in base all'indice
function loadTrack(index) {
  const track = tracks[index] // Traccia corrente

  // Imposta i dati della traccia
  curr_track.src = track.preview
  curr_track.load()

  // Immagine, titolo e artista
  track_art.src = track.album.cover
  track_name.textContent = track.title
  track_artist.textContent = track.artist.name

  // Resetta i timer e controlli
  reset()

  curr_track.addEventListener('loadedmetadata', () => {
    total_duration.textContent = formatTime(curr_track.duration) // Mostra durata totale
    seek_slider.max = 100
  })

  // Quando la traccia finisce, passa alla successiva
  curr_track.addEventListener('ended', nextTrack)
}

// Funzione per formattare il tempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

// Aggiorna il tempo corrente e la barra di scorrimento
function setUpdate() {
  if (!isNaN(curr_track.duration) && curr_track.duration > 0) {
    const seekPosition = (curr_track.currentTime / curr_track.duration) * 100
    seek_slider.value = seekPosition

    curr_time.textContent = formatTime(curr_track.currentTime) // Aggiorna tempo corrente
    total_duration.textContent = formatTime(curr_track.duration) // Mostra durata totale
  }
}

// Resetta i controlli
function reset() {
  curr_time.textContent = '00:00'
  total_duration.textContent = '00:00'
  seek_slider.value = 0
}

// Funzioni per gestione play e pausa
function playTrack() {
  curr_track.play()
  isPlaying = true
  playpause_btn.querySelector('i').classList.remove('fa-play-circle')
  playpause_btn.querySelector('i').classList.add('fa-pause-circle')
}

function pauseTrack() {
  curr_track.pause()
  isPlaying = false
  playpause_btn.querySelector('i').classList.remove('fa-pause-circle')
  playpause_btn.querySelector('i').classList.add('fa-play-circle')
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack()
}

// TRACCIA SUCCESSIVA
function nextTrack() {
  if (track_index < tracks.length - 1 && !isRandom) {
    track_index++
  } else if (isRandom) {
    track_index = Math.floor(Math.random() * tracks.length)
  } else {
    track_index = 0
  }
  loadTrack(track_index)
  playTrack()
}

// TRACCIA PRECEDENTE
function prevTrack() {
  if (track_index > 0) {
    track_index--
  } else {
    track_index = tracks.length - 1
  }
  loadTrack(track_index)
  playTrack()
}

// TASTO RANDOM
function randomTrack() {
  isRandom = !isRandom
  randomIcon.classList.toggle('randomActive')
}

// TASTO REPEAT
function repeatTrack() {
  isRepeat = !isRepeat
  repeatIcon.classList.toggle('repeatActive')
}

// Regola la posizione corrente della traccia
function seekTo() {
  if (!isNaN(curr_track.duration)) {
    const seekto = curr_track.duration * (seek_slider.value / 100)
    curr_track.currentTime = seekto
  }
}

// Regola il volume della traccia
function setVolume() {
  curr_track.volume = volume_slider.value / 100
}

curr_track.addEventListener('timeupdate', setUpdate)

// ICONA (SALVA) DA CUORE VUOTO A -> CUORE PIENO VERDE  I
const heartIcons = document.getElementsByClassName('heart')

for (let i = 0; i < heartIcons.length; i++) {
  heartIcons[i].addEventListener('click', function () {
    if (this.classList.contains('bi-heart', 'text-light')) {
      this.classList.remove('bi-heart', 'text-light')
      this.classList.add('bi-heart-fill', 'text-success')
    } else {
      this.classList.remove('bi-heart-fill', 'text-success')
      this.classList.add('bi-heart', 'text-light')
    }
  })
}

// MUSIC PLAYER MOBILE
const playerDivSm = document.getElementById('player-mobile')

fetch(url + id)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero dei dati.')
    }
  })
  .then((album) => {
    const track = album.tracks.data[track_index]

    playerDivSm.innerHTML = `
      <div class="d-flex align-items-center">
        <img
          src="${track.album.cover}"
          alt="${track.title}"
          class="rounded-circle mx-3"
          style="width: 50px"
          id="mobile-track-art"
        />
        <h6 class="m-0 text-white" id="mobile-track-name">${track.title}</h6>
      </div>
      <div class="d-flex align-items-center">
        <a href="#" class="text-decoration-none">
          <i
            class="bi bi-speaker text-decoration-none text-light opacity-75 pe-3 fs-4"
          ></i>
        </a>
        <a href="#" class="text-decoration-none">
          <i class="bi bi-heart mx-1 text-light fs-4 pe-2 heart"></i>
        </a>
        <a href="#" id="mobile-play-btn">
          <i class="bi bi-play-fill text-light fs-1 me-2 ms-1"></i>
        </a>
      </div>
    `

    //  pulsante play/pause
    const mobilePlayBtn = document.getElementById('mobile-play-btn')
    mobilePlayBtn.addEventListener('click', function () {
      playpauseTrack()
      const icon = this.querySelector('i')
      if (isPlaying) {
        icon.classList.remove('bi-play-fill')
        icon.classList.add('bi-pause-fill')
      } else {
        icon.classList.remove('bi-pause-fill')
        icon.classList.add('bi-play-fill')
      }
    })

    // cuore
    const mobileHeartIcon = playerDivSm.querySelector('.heart')
    mobileHeartIcon.addEventListener('click', function () {
      if (this.classList.contains('bi-heart', 'text-light')) {
        this.classList.remove('bi-heart', 'text-light')
        this.classList.add('bi-heart-fill', 'text-success')
      } else {
        this.classList.remove('bi-heart-fill', 'text-success')
        this.classList.add('bi-heart', 'text-light')
      }
    })
  })
  .catch((error) => {
    console.error('Errore:', error)
  })
