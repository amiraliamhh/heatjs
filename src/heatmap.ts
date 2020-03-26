import { calcRGB } from './color'

export interface HeatmapData {
  x: number
  y: number
  value?: number
}

export enum Priority {
  avg = 'avg',
  median = 'median'
}

export enum HeatType {
  value = 'value',
  point = 'point'
}

type color = number|string
export interface HeatCircle {
  size: number
  color: color
  blurSize: string
}

type colors = 'darkBlue'|'lightBlue'|'green'|'yellow'|'red'
export interface HeatCircles {
  darkBlue?: HeatCircle
  lightBlue?: HeatCircle
  green?: HeatCircle
  yellow?: HeatCircle
  red?: HeatCircle
}

export interface HeatmapOptions {
  priority?: Priority
  heatType?: HeatType
  heatCircles?: HeatCircles
}

export interface DrawCircleOptions {
  color: string
  blurSize?: string
}

class Heatmap {
  protected readonly defaultBlurSize = '2px'
  protected readonly defaultSizes: Required<HeatCircles> = Object.freeze<Required<HeatCircles>>({
    darkBlue: {
      size: 26,
      color: 100,
      blurSize: '3px'
    },
    lightBlue: {
      size: 22,
      color: 410,
      blurSize: '1px'
    },
    green: {
      size: 18,
      color: 710,
      blurSize: '1px'
    },
    yellow: {
      size: 16,
      color: 770,
      blurSize: '1px'
    },
    red: {
      size: 4,
      color: 1020,
      blurSize: '2px'
    }
  })

  protected data: HeatmapData[]
  protected el: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D
  protected options: HeatmapOptions

  constructor(
    element: HTMLCanvasElement,
    data: HeatmapData[],
    {
      priority = Priority.avg,
      heatType = HeatType.point
    }: HeatmapOptions = {}
  ) {
    this.data = data
    this.el = element
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D
    this.options = Object.freeze({
      priority,
      heatType
    })
  }

  public drawHeatPoint(x: number, y: number) {
    const { rgba: darkBlue } = calcRGB(100)
    const { rgba: lightBlue } = calcRGB(410)
    const { rgba: green } = calcRGB(710)
    const { rgba: yellow } = calcRGB(770)
    const { rgba: red } = calcRGB(1020)
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
      blurSize = this.defaultBlurSize
    }: DrawCircleOptions
  ) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.filter = `blur(${blurSize})`
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.closePath()
  }

  private drawPoints(data: HeatmapData[], colorName: colors, opacity = 1) {
    const { size, color } = this.defaultSizes[colorName]
    data.forEach(({ x, y }) => {
      this.drawCircle(x, y, size, {
        color: typeof color === 'string' ? color : calcRGB(color, opacity).rgba
      })
    })
  }
}

export default Heatmap
