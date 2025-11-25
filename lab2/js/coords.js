const out = document.getElementById('coordOut')

// Показ координат клика
function showCoords (event) {
  const x = event.clientX
  const y = event.clientY
  const tag = event.target.tagName.toLowerCase()

  out.textContent = `X: ${x}, Y: ${y} — ${tag}`
}

document.addEventListener('pointerdown', showCoords)
