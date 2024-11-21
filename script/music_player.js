const url = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=ac/dc'

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
let isPlaying = false // Stato della riproduzione
let isRandom = false // Stato della modalità casuale
let isRepeat = false
let tracks = [] // Lista delle tracce caricate dall'API

// Recupera i dati delle tracce dall'API
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero delle tracce.')
    }
  })
  .then((data) => {
    tracks = data.data
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
  track_art.src = track.album.cover // Immagine album
  track_name.textContent = track.title // Titolo del brano
  track_artist.textContent = track.artist.name // Nome dell'artista

  // Resetta i timer e controlli
  reset()

  curr_track.addEventListener('loadedmetadata', () => {
    total_duration.textContent = formatTime(curr_track.duration) // Mostra durata totale
    seek_slider.max = 100
  })

  // Quando la traccia finisce, passa alla successiva
  curr_track.addEventListener('ended', nextTrack)
}

// Funzione di utilità per formattare il tempo (minuti e secondi)
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

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero dei dati.')
    }
  })
  .then((album) => {
    const track = album.data[track_index]

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
