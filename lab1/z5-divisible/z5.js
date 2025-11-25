// Проверка деления числа n на x и y
// если оба делятся без остатка -> true

function isDivisible(n, x, y) {
  return n % x === 0 && n % y === 0;
}

console.log(isDivisible(3, 1, 3));
console.log(isDivisible(12, 2, 6));
console.log(isDivisible(100, 5, 3));
console.log(isDivisible(12, 7, 5));
