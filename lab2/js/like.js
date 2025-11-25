// Лайк кнопка 
// сделала по принципу toggle

const likeBtn = document.getElementById('likeBtn')

function handleLikeClick () {
  likeBtn.classList.toggle('active')
}

likeBtn.addEventListener('click', handleLikeClick)
