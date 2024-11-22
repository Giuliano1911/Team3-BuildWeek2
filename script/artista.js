//id header-picture per foto artista nell'header

//provo con un artista per capire se funziona

const shuffle = document.getElementById('shuffle')

shuffle.addEventListener('click', function () {
  if (shuffle.classList.contains('text-white')) {
    shuffle.classList.remove('text-white')
    shuffle.classList.add('text-success')
  } else {
    shuffle.classList.add('text-white')
    shuffle.classList.remove('text-success')
  }
})

const url = 'https://striveschool-api.herokuapp.com/api/deezer/artist/'

const addressBarContent = new URLSearchParams(window.location.search)
const id = addressBarContent.get('id')

const key = 'tracks'
let liked = JSON.parse(localStorage.getItem(key))

if (liked) {
} else {
  liked = []
}

const albumDivSm = document.getElementById('album-top-sm')
const albumDivMd = document.getElementById('album-top-md')
const braniPrefeSm = document.getElementById('brani-prefe-sm')
const braniPrefeMd = document.getElementById('brani-prefe-md')
const albums = document.getElementById('other-albums')
const collapsible = document.getElementById('visualizza-altro')
const altro = document.getElementById('text-change')
const meno = document.getElementById('text-meno')
let bandName = ''
let url2 = ''
let tracks = [] // Lista delle tracce caricate dall'API
let track_index = 0 // Indice della traccia corrente

fetch(url + id)
  .then((response) => {
    console.log(response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('No ok')
    }
  })
  .then((artist) => {
    console.log(artist)
    const random = Math.ceil(Math.random() * 10)
    albumDivSm.innerHTML = `
    <div class="d-flex align-items-end position-relative" style="background-image: url(${artist.picture_big}); height: 400px; background-repeat: no-repeat; background-size: cover; background-position: center;">
           <div class="d-md-none position-absolute top-0 start-0 ms-2 mt-3">
                  <a href="./homepage.html" class="z-1"
                    ><i class="bi bi-arrow-left text-white ms-2 rounded rounded-circle p-1 bg-secondary fs-3"></i
                  ></a>
                </div>    
    <h1 class="fw-bold fa-3x mx-4">${artist.name}</h1>
    </div>
    
    <div class="d-flex">
      
    <p class="mb-0 ms-2 mt-4">${artist.nb_fan} ascoltatori mensili</p>
    </div>
    `
    braniPrefeSm.classList.add('d-md-none')
    braniPrefeSm.innerHTML = `
   <img src="${artist.picture_big}"
        class="rounded-circle"
        style="height: 60px; width: 60px"
        alt="artist"/> 
    <span class="cerchio px-1 border border-2 border-light bg-success position-relative 
    "style="right:20px;top:40px"><i class="bi bi-heart-fill fa-xs pad" ></i></span>
    <span class="d-flex flex-column justify-content-center">

    <h6 class="text-light mb-0 ps-2">Brani che ti piacciono</h6>
    <p class="mb-0 ps-2 text-secondary">${random} brani di ${artist.name} </p></span>
    `
    albumDivMd.innerHTML = `
    
    <div class="d-flex flex-column justify-content-end position-relative" style="background-image: url(${artist.picture_big}); height: 400px; background-repeat: no-repeat; background-size: cover; background-position:center">
    <div class="my-3 d-none d-md-block position-absolute top-0 start-0 ms-3">
                  <a
                    href="./homepage.html"
                    class="rounded-circle bg-dark text-decoration-none text-light opacity-75 fs-5 p-1 me-3"
                    ><i class="bi bi-chevron-left"></i
                  ></a>
                  <a
                    href="#"
                    class="rounded-circle bg-dark bg-opacity-50 text-decoration-none text-light opacity-50 fs-5 p-1"
                    ><i class="bi bi-chevron-right"></i
                  ></a>
                </div>
    <div class="d-flex gap-2 ms-4">
    <i class="bi bi-patch-check-fill text-info fs-5"></i>
    <p class=" mb-0 text-white small-text align-self-center">Artista verificato</p>    
    </div>
    <h1 class="fw-bold ms-4 big-text">${artist.name}</h1>
        <p class="mb-4 ms-4 mt-3">${artist.nb_fan} ascoltatori mensili</p>
    </div>
    `
    braniPrefeMd.innerHTML = `
<div class="d-flex">
   <img src="${artist.picture_big}"
        class="rounded-circle"
        style="height: 60px; width: 60px"
        alt="artist"/> 
        <span class="cerchio px-1 border border-2 border-black text-white bg-success position-relative 
    "style="right:20px;top:40px"><i class="bi bi-heart-fill fa-xs pad" ></i></span>
    <span class="d-flex flex-column">
    <div id="go-left">
    <h6 class="text-light mb-0 small">Brani che ti piacciono</h6>
    
    <p class="mb-0 text-secondary small">${random} brani di ${artist.name} </p></span>
    </div>
    </div>
    `
    bandName = `${artist.name}`
    url2 = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${bandName}`
    createBrani()
  })
  .catch((err) => {
    console.log('errore', err)
  })

//   funzione che genera i 10 top brani
const createBrani = function () {
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
      for (let i = 0; i < 5; i++) {
        const trackMinutes = Math.floor(songs.data[i].duration / 60)
        let trackSeconds = songs.data[i].duration - trackMinutes * 60
        trackSeconds < 10 ? (trackSeconds = '0' + trackSeconds) : trackSeconds
        const newRow = document.createElement('div')
        newRow.classList.add('d-flex', 'text-white', 'mt-3')
        newRow.innerHTML = `
        <div class="col col-11 col-md-7">
        <div class="d-flex">
          <p class="mb-0 me-3 mt-2">${i + 1}</p>
          <img class="me-3" src="${
            songs.data[i].album.cover_small
          }" style="width:40px;height:40px">
          <div>
            <p class="mb-0">${songs.data[i].title}</p>
            <a class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover" href="./album.html?id=${
              songs.data[i].album.id
            }"><p class="mb-0">${songs.data[i].album.title}</p></a>
          </div>
        </div>
        </div>
        <div class="col col-3 d-none d-md-block text-end"><p class="d-none d-md-block mb-0 opacity-50">${
          songs.data[i].rank
        }</p></div>
        <div class="col col-1 col-md-2 text-end d-flex justify-content-end">
        <button class="border border-0 delete p-0 bg-transparent me-2" style="height:20px"><i class="bi bi-heart text-white iclass"></i></button>
          <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
          <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
        </div>`
        recommended.appendChild(newRow)
        let button = document.getElementsByClassName('delete')[i]
        let iclass = document.getElementsByClassName('iclass')[i]
        button.addEventListener('click', () => {
          iclass.classList.replace('bi-heart', 'bi-heart-fill')
          iclass.classList.replace('text-white', 'text-success')
          liked.push(songs.data[i])
          localStorage.setItem(key, JSON.stringify(liked))
        })
        tracks.push(songs.data[i])
      }
      for (let i = 5; i < 10; i++) {
        const trackMinutes = Math.floor(songs.data[i].duration / 60)
        let trackSeconds = songs.data[i].duration - trackMinutes * 60
        trackSeconds < 10 ? (trackSeconds = '0' + trackSeconds) : trackSeconds
        const newRow = document.createElement('div')
        newRow.classList.add('d-flex', 'text-white', 'mt-3')
        newRow.innerHTML = `
        <div class="col col-11 col-md-7">
        <div class="d-flex">
          <p class="mb-0 me-3 mt-2">${i + 1}</p>
          <img class="me-3" src="${
            songs.data[i].album.cover_small
          }" style="width:40px;height:40px">
          <div>
            <p class="mb-0">${songs.data[i].title}</p>
            <a class="link-ligth link-underline-opacity-0 link-underline-light text-white link-underline-opacity-100-hover" href="./album.html?id=${
              songs.data[i].album.id
            }"><p class="mb-0">${songs.data[i].album.title}</p></a>
          </div>
        </div>
        </div>
        <div class="col col-3 d-none d-md-block text-end"><p class="d-none d-md-block mb-0 opacity-50">${
          songs.data[i].rank
        }</p></div>
        <div class="col col-1 col-md-2 text-end d-flex justify-content-end">
        <button class="border border-0 delete2 p-0 bg-transparent me-2" style="height:20px"><i class="bi bi-heart text-white iclass2"></i></button>
          <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
          <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
        </div>`
        collapsible.appendChild(newRow)
        const button2 = document.getElementsByClassName('delete2')[i - 5]
        const iclass2 = document.getElementsByClassName('iclass2')[i - 5]
        button2.addEventListener('click', () => {
          iclass2.classList.replace('bi-heart', 'bi-heart-fill')
          iclass2.classList.replace('text-white', 'text-success')
          liked.push(songs.data[i])
          localStorage.setItem(key, JSON.stringify(liked))
        })
        tracks.push(songs.data[i])
      }
      altro.addEventListener('click', () => {
        altro.classList.add('d-none')
      })
      meno.addEventListener('click', () => {
        altro.classList.remove('d-none')
      })
      loadTrack(track_index)
      funzione2()

      const newh2 = document.createElement('div')
      newh2.innerHTML = `<h2 class="text-white">Discografia</h2>`
      albums.appendChild(newh2)
      for (let i = 1; i < 4; i++) {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-8', 'col-sm-6', 'col-md-4', 'mt-3')
        newCol.innerHTML = `
        <div class="card bg-sfondo text-white h-100">
           <img role="button" onclick="window.location.replace('album.html?id=${
             songs.data[i * 4].album.id
           }')" src="${
          songs.data[i * 4].album.cover_big
        }" class="card-img-top" alt="cover album">
           <div class="card-body">
               <h5 role="button" onclick="window.location.replace('album.html?id=${
                 songs.data[i * 4].album.id
               }')" class="card-title">${songs.data[i * 4].album.title}</h5>
            </div>
        </div>`
        albums.appendChild(newCol)
      }
    })
    .catch((err) => {
      console.log('errore', err)
    })
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
