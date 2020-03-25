const colorRange = 1020
const max = 255

export function calcRGB(range: number, opacity: number = 1) {
  const r = calcR(range)
  const g = calcG(range)
  const b = calcB(range)
  return {
    raw: [r,g,b],
    rgb: `rgb(${[r,g,b].join(',')})`,
    rgba: `rgba(${[r,g,b].join(',')},${opacity})`
  }
}

function calcR(range: number) {
  let r = 0
  if (range > max * 2 && range - max * 2 > max) {
    r = max
  } else if (range > max * 2) {
    r = range - max * 2
  }
  return r
}

function calcG(range: number) {
  let g = 0
  if (range <= max * 3 && range > max * 2) {
    g = max
  } else if (range <= max * 2 && range > max) {
    g = max
  } else if (range <= max) {
    g = range
  } else if (range >= max * 3) {
    g = max - (range - max * 3)
  }
  return g
}

function calcB(range: number) {
  let b = max
  if (range > max * 2) {
    b = 0
  } else if (range > max && range <= max * 2) {
    b = range - max > 0 ? b - (range - max) : 0
  }
  return b
}
