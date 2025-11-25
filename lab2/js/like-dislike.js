const like2 = document.getElementById('like2')
const dislike2 = document.getElementById('dislike2')

// Активирует кнопку + снимает вторую
function activateLike () {
  like2.classList.toggle('active')
  if (like2.classList.contains('active')) {
    dislike2.classList.remove('active')
  }
}

function activateDislike () {
  dislike2.classList.toggle('active')
  if (dislike2.classList.contains('active')) {
    like2.classList.remove('active')
  }
}

like2.addEventListener('click', activateLike)
dislike2.addEventListener('click', activateDislike)
