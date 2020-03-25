import { calcRGB } from './color'

interface HeatmapData {
  x: number
  y: number
  value: number
}

interface DrawCircleOptions {
  color: string
  blurSize?: string
}

class Heatmap {
  protected data: HeatmapData[]
  protected el: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D

  constructor(element: HTMLCanvasElement, data: HeatmapData[]) {
    this.data = data
    this.el = element
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D
  }

  public drawHeatPoint(x: number, y: number) {
    const { rgb } = calcRGB(765)
    console.log(rgb)
    this.drawCircle(x, y, 10, { color: rgb })
    this.drawCircle(100, y, 10, { color: 'rgb(0,255,0)' })
    this.drawCircle(150, y, 10, { color: 'rgb(0,0,255)' })
    this.drawCircle(200, y, 10, { color: 'rgb(0,255,100)' })
  }

  protected drawCircle(
    x: number,
    y: number,
    radius: number,
    {
      color,
      blurSize = '2px'
    }: DrawCircleOptions
  ) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.filter = `blur(${blurSize})`
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.closePath()
  }
}

export default Heatmap
