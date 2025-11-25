// sampleArray
// Берём случайные элементы массива в количестве count

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sampleArray(arr, count) {
  const result = [];

  // каждый раз выбираю случайный индекс
  for (let i = 0; i < count; i++) {
    result.push(arr[randomNumber(0, arr.length - 1)]);
  }

  return result;
}

console.log(sampleArray([1,2,3,4], 2));
console.log(sampleArray([1,2,3,4], 3));
