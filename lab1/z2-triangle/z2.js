// Треугольник
// Здесь проверяем по правилу стороны, можно ли построить треугольник

function triangleInfo(a, b, c) {

  // если стороны не подходят, сразу вывод
  if (a + b <= c || a + c <= b || b + c <= a) {
    console.log("треугольника не существует");
    return;
  }

  console.log("треугольник существует");

  const perimeter = a + b + c;
  console.log("периметр =", perimeter);

  // формула Герона 
  const p = perimeter / 2;
  const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
  console.log("Площадь =", area);

  console.log("Соотношение =", perimeter / area);
}

triangleInfo(3, 4, 5);
