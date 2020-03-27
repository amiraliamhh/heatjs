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
      size: 15,
      color: 770,
      blurSize: '3px'
    },
    red: {
      size: 4,
      color: 1020,
      blurSize: '2px'
    }
  })
  protected readonly defaultLayers = [
    'red',
    'yellow',
    'green',
    'lightBlue',
    'darkBlue'
  ]

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

  public drawHeatmap(
    layers: number = 5
  ) {
    for (let i = layers; i > 0; i--) {
      this.data.forEach(({ x, y }) => {
        this.drawPoint([{ x, y }], this.defaultLayers[i - 1] as colors, .8)
      })
    }
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

  private drawPoint(data: HeatmapData[], colorName: colors, opacity = 1) {
    const { size, color } = this.defaultSizes[colorName]
    data.forEach(({ x, y }) => {
      this.drawCircle(x, y, size, {
        color: typeof color === 'string' ? color : calcRGB(color, opacity).rgba
      })
    })
  }
}

export default Heatmap
