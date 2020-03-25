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
    const { rgb: darkBlue } = calcRGB(100)
    const { rgb: lightBlue } = calcRGB(410)
    const { rgb: green } = calcRGB(710)
    const { rgb: yellow } = calcRGB(770)
    const { rgb: red } = calcRGB(1020)
    this.drawCircle(x, y, 26, { color: darkBlue, blurSize: '3px' })
    this.drawCircle(x, y, 22, { color: lightBlue, blurSize: '1px' })
    this.drawCircle(x, y, 18, { color: green, blurSize: '1px' })
    this.drawCircle(x, y, 16, { color: yellow, blurSize: '1px' })
    this.drawCircle(x, y, 4, { color: red, blurSize: '2px' })
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
