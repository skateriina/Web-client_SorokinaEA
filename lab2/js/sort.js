// массив чисел — создаю вручную


const numbers = [12, 3, 45, 7, 2, 29, 18]

const numList = document.getElementById('numList')

function renderList (arr) {
  // удаляем старый вывод
  numList.innerHTML = ''

  // создаём li через JS 
  arr.forEach(function (num) {
    const li = document.createElement('li')
    li.textContent = num
    numList.appendChild(li)
  })
}

// кнопки
const ascBtn = document.getElementById('sortAsc')
const descBtn = document.getElementById('sortDesc')
const resetBtn = document.getElementById('sortReset')

// обработчики — без анонимных функций
function sortAscending () {
  const sorted = [...numbers].sort(function (a, b) { return a - b })
  renderList(sorted)
}

function sortDescending () {
  const sorted = [...numbers].sort(function (a, b) { return b - a })
  renderList(sorted)
}

function sortReset () {
  renderList(numbers)
}

ascBtn.addEventListener('click', sortAscending)
descBtn.addEventListener('click', sortDescending)
resetBtn.addEventListener('click', sortReset)

// Отрисовать изначально
renderList(numbers)
