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
    <div class="d-flex align-items-end position-relative" style="background-image: url(${artist.picture_big}); height: 400px; background-repeat: no-repeat; background-size: cover;">
           <div class="d-md-none position-absolute top-0 start-0 ms-2 mt-3">
                  <a href="./homepage.html" class="z-1"
                    ><i class="bi bi-arrow-left text-white ms-2 rounded rounded-circle p-1 bg-secondary"></i
                  ></a>
                </div>    
    <h1 class="fw-bold fa-3x mx-4">${artist.name}</h1>
    </div>
    
    <div class="d-flex">
      
    <p class="mb-0 ms-2 mt-3">${artist.nb_fan} ascoltatori mensili</p>
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
    
    <div class="d-flex flex-column justify-content-end position-relative " style="background-image: url(${artist.picture_big}); height: 400px; background-repeat: no-repeat; background-size: cover;">
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
        <div class="col col-1 col-md-2 text-end">
          <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
          <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
        </div>`
        recommended.appendChild(newRow)
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
        <div class="col col-1 col-md-2 text-end">
          <a href="#" class="text-white d-md-none"><i class="bi bi-three-dots-vertical"></i></a>
          <p class="d-none d-md-block mb-0 opacity-50">${trackMinutes}:${trackSeconds}</p>
        </div>`
        collapsible.appendChild(newRow)
      }
      altro.addEventListener('click', () => {
        altro.classList.add('d-none')
      })
      meno.addEventListener('click', () => {
        altro.classList.remove('d-none')
      })

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
