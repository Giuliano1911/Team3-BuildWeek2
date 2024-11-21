const TracksRow = document.getElementById('album-row-sm')

const key = 'tracks'
let liked = JSON.parse(localStorage.getItem(key))
let tracks = [] // Lista delle tracce caricate dall'API
let track_index = 0 // Indice della traccia corrente

if (liked) {
  tracks = [...liked]
} else {
  liked = []
}

const createPlaylist = function () {
  TracksRow.innerText = ''
  const liked = JSON.parse(localStorage.getItem(key))
  for (let i = 0; i < liked.length; i++) {
    // creo div dentro offcanvas
    const trackMinutes = Math.floor(liked[i].duration / 60)
    let trackSeconds = liked[i].duration - trackMinutes * 60
    trackSeconds < 10 ? (trackSeconds = '0' + trackSeconds) : trackSeconds
    const newItem = document.createElement('div')
    newItem.classList.add('text-white', 'row')
    newItem.innerHTML = `
    <div class="col col-11 col-md-7">
      <div class="d-flex">
        <p class="d-none d-md-block mb-0 me-3 mt-2 opacity-50">${i + 1}</p>
        <img class="me-3" src="${
          liked[i].album.cover_small
        }" style="width:40px;height:40px">
        <div>
          <p class="mb-0">${liked[i].title}</p>
          <a class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover" href="./artista.html?id=${
            liked[i].artist.id
          }"><p>${liked[i].artist.name}</p></a>
        </div>
      </div>
      </div>
      <div class="col col-3 d-none d-md-block text-end p-0"><a href="./album.html?id=${
        liked[i].album.id
      }" class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover"><p class="d-none d-md-block mb-0">${
      liked[i].album.title
    }</p></a></div>
      <div class="col col-1 col-md-2 text-end d-flex justify-content-end p-0">
      <button class="border border-0 delete p-0 bg-transparent me-2" style="height:20px"><i class="bi bi-heart-fill text-success"></i></button>
        <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
        <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
      </div>`
    TracksRow.appendChild(newItem)

    const button = document.getElementsByClassName('delete')[i]
    button.addEventListener('click', () => {
      // ogni bottone "trash" elimina il corrispondente elemento dal localStorage
      liked.splice(i, 1)
      localStorage.setItem(key, JSON.stringify(liked))
      createPlaylist()
    })
  }
  loadTrack(track_index)
  funzione2()
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

let isPlaying = false
let isRandom = false
let isRepeat = false

// Recupera i dati delle tracce dall'array

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
const funzione2 = function () {
  const track = tracks[track_index]

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
}

createPlaylist()
