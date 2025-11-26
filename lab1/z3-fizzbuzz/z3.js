// FizzBuzz
// Логика: четное -> buzz, нечетное -> fizz, но если кратно 5 -> fizz buzz

function fizzBuzz(n) {
  for (let i = 0; i <= n; i++) {
    if (i % 5 === 0) {
      console.log(i, "fizz buzz");
    } else if (i % 2 === 0) {
      console.log(i, "buzz");
    } else {
      console.log(i, "fizz");
    }
  }
}

fizzBuzz(10);
