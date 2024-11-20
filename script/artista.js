//id header-picture per foto artista nell'header

//provo con un artista per capire se funziona
const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/2"

fetch(url)
    .then((response) => {
        console.log(response)
        if (response.ok) {
            return response.json()
        } else {throw new Error ('errore')}
    })

    .then((artist) =>{
        console.log(artist)

        const artistPicHeader = document.getElementById('headerPicture')
        artistPicHeader.innerHTML = `<div class="row"> <img id="picture" src="${artist.picture_medium}" class="p-0" style="width:100vw;z-index:1; object-fit:cover">
         <h1 class=" ps-3 position-relative text-light fw-bold mb-0" style="z-index:2; bottom:45px"> ${artist.name}</h1> <small class="mb-0 ps-4 text-secondary position-relative" style="bottom:20px">${artist.nb_fan} ascoltatori mensili</small> 
         </div>`
        headerPicture.appendChild(artistPicHeader)

//devo inserire i punti a nb_fan

        const artistPicIcon = document.getElementById('artistIcon') //è la row
        artistPicIcon.innerHTML = `<img src="${artist.picture_small}" class="rounded-circle" style="height: 80px; width: 80px" alt="artist" /> <span class="cerchio px-1 border border-2 border-light bg-success position-relative " style="right:20px;top:50px"><i class="bi bi-heart-fill fa-xs"></i></span> <span class="d-flex flex-column justify-content-center"> <h6 class="text-light mb-0 ps-2">Brani che ti piacciono</h6> <p class="mb-0 ps-2 text-secondary">10 brani di ${artist.name}</p></span>
        `
    artistPicIcon.appendChild(artistPicIcon)
    })


    .catch((err) => {
        console.log('errore', err)
      })