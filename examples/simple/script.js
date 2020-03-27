const canvas = document.querySelector('#canvas')
const hm = new Heatmap(canvas, [
  {
    x: 40,
    y: 40
  },
  {
    x: 40,
    y: 45
  }
])
hm.drawHeatmap()
