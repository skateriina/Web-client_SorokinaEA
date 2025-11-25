const cartCounter = document.getElementById('cartCounter')
const cartBtns = document.querySelectorAll('.add-to-cart')

let count = 0 // счётчик корзины

function addToCart () {
  // тут увеличиваем количество
  count += 1
  cartCounter.textContent = count
}

cartBtns.forEach(function (btn) {
  btn.addEventListener('click', addToCart)
})
