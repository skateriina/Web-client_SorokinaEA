// Собственный filter
// Функция принимает массив и функцию-фильтр

function myFilterArray(arr, filterFn) {
  const result = [];

  for (let item of arr) {
    // если функция-фильтр вернула true — добавляю
    if (filterFn(item)) {
      result.push(item);
    }
  }

  return result;
}

// Просто пример функции-фильтра
function isFirstV(str) {
  return str.startsWith("V");
}

console.log(myFilterArray(["Short", "VeryLong"], isFirstV));
