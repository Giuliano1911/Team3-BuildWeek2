const url = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=ac/dc'

fetch(url)
  .then((response) => {
    console.log(response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('No ok')
    }
  })
  .then((data) => {
    console.log(data)
    // Qui posso lavorare con il dato preso dal server
  })
  .catch((err) => {
    console.log('errore', err)
  })
