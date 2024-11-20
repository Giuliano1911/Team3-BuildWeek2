// ICONA (SALVA) DA CUORE VUOTO A -> CUORE PIENO VERDE  I

const heartIcons = document.getElementsByClassName('heart')

for (let i = 0; i < heartIcons.length; i++) {
  heartIcons[i].addEventListener('click', function () {
    if (this.classList.contains('bi-heart', 'text-white')) {
      this.classList.remove('bi-heart', 'text-white')
      this.classList.add('bi-heart-fill', 'text-success')
    } else {
      this.classList.remove('bi-heart-fill', 'text-success')
      this.classList.add('bi-heart', 'text-white')
    }
  })
}

const url = 'https://striveschool-api.herokuapp.com/api/deezer/album/78630952'
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

    albumDivMd.innerHTML = `<img id="img" style="width:150px;height:150px" crossorigin='anonymous' src='${album.cover_big}' onload="start()">
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
    albumDivSm.innerHTML = `<img crossorigin='anonymous' src=${album.cover_big}  class="mx-auto w-50"> 
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
        <div class="card bg-sfondo text-white">
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
  let imgReference = document.querySelector('#img')
  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference)

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context)

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors)

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent)

  background.style.backgroundColor = `${'#' + mostRecurrentHex}`
  // console.log del risultato
  console.log(mostRecurrentHex)
}
