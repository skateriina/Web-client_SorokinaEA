// Елка
// Каждая строка больше предыдущей на 1 символ

function tree(levels) {
  let out = "";

  for (let i = 1; i <= levels; i++) {
    const symbol = i % 2 === 1 ? "*" : "#"; // чередование символов
    out += symbol.repeat(i) + "\n";
  }

  out += "||"; // ствол
  console.log(out);
}

tree(12);
