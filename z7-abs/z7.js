// Абсолютное значение
// Без Math.abs, делаем по идее: если минус -> меняю знак

function absValue(num) {
  return num < 0 ? -num : num;
}

console.log(absValue(-2));
console.log(absValue(100));
console.log(absValue(0));
