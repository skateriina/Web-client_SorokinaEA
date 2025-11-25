// Сэндвичи
// Нужно 2 хлеба и 1 сыр => считаем минимально возможное

function countSandwiches(obj) {
  return Math.min(Math.floor(obj.bread / 2), obj.cheese);
}

console.log(countSandwiches({ bread: 5, cheese: 6 })); // должно быть 2
