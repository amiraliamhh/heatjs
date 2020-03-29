function generateRandomPoints(num) {
  return new Array(num).fill({}).map(a => ({
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 300)
  }))
}

const canvas = document.querySelector('#canvas')
// const hm = new Heatmap(canvas, generateRandomPoints(300))
const hm = new Heatmap(canvas, [{ x: 40, y: 90 }])
hm.drawPoint({ x: 40, y: 40 }, 'curiousBlue')
hm.drawPoint({ x: 80, y: 40 }, 'deYork')
hm.drawPoint({ x: 120, y: 40 }, 'primrose')
hm.drawPoint({ x: 160, y: 40 }, 'saharaSand')
hm.drawPoint({ x: 200, y: 40 }, 'jaffa')
hm.drawPoint({ x: 240, y: 40 }, 'valencia')
hm.drawPoint({ x: 280, y: 40 }, 'red')
hm.drawHeatmap(7, true)