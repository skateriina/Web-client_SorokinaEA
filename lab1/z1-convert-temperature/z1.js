// Конвертация температуры
// Тут делаю функцию, которая переводит 

function convertTemperature(value, direction) {
  if (direction === 'toC') {
    const c = (value - 32) * 5/9; 
    return `${c} C`;
  } else if (direction === 'toF') {
    const f = value * 9/5 + 32; 
    return `${f} F`;
  }
}

console.log(convertTemperature(32, 'toC'));
console.log(convertTemperature(10, 'toF'));
