function generateRandomPoints(num) {
  return new Array(num).fill({}).map(a => ({
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 300)
  }))
}

const canvas = document.querySelector('#canvas')
const hm = new Heatmap(canvas, generateRandomPoints(300))
hm.drawHeatmap()
