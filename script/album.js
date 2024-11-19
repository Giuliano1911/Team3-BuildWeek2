// ICONA (SALVA) DA CUORE VUOTO A -> CUORE PIENO VERDE  I

const heartIcon = document.getElementsByClassName('heart')

heartIcon.addEventListener('click', function () {
  if (this.classList.contains('bi-heart', 'text-white')) {
    this.classList.remove('bi-heart', 'text-white')
    this.classList.add('bi-heart-fill', 'text-success')
  } else {
    this.classList.remove('bi-heart-fill', 'text-success')
    this.classList.add('bi-heart', 'text-white')
  }
})
