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
  shadowBlur?: number
}

type colors = 'curiousBlue'|'deYork'|'primrose'|'saharaSand'|'jaffa'|'valencia'|'red'
export interface HeatCircles {
  [key: string]: HeatCircle
}

export interface HeatmapOptions {
  priority?: Priority
  heatType?: HeatType
  heatCircles?: HeatCircles
}

export interface DrawCircleOptions {
  color: string
  blurSize?: string
  shadowBlur?: number
}

class Heatmap {
  protected readonly defaultBlurSize = '2px'
  protected readonly defaultSizes: Required<HeatCircles> = Object.freeze<Required<HeatCircles>>({
    curiousBlue: {
      size: 20,
      color: 'rgba(39,141,190,.8)',
      blurSize: '4px',
      shadowBlur: 4
    },
    deYork: {
      size: 16,
      color: 'rgba(121,202,164,.8)',
      blurSize: '2px'
    },
    primrose: {
      size: 13,
      color: 'rgba(208,236,156,.8)',
      blurSize: '2px'
    },
    saharaSand: {
      size: 10,
      color: 'rgba(245,232,144,.8)',
      blurSize: '2px'
    },
    jaffa: {
      size: 7,
      color: 'rgba(246,133,74,.8)',
      blurSize: '2px'
    },
    valencia: {
      size: 4,
      color: 'rgba(217,68,79,.8)',
      blurSize: '2px'
    },
    red: {
      size: 1,
      color: 'rgba(172,21,69,.8)',
      blurSize: '2px'
    }
  })
  protected readonly defaultLayers = [
    'red',
    'valencia',
    'jaffa',
    'saharaSand',
    'primrose',
    'deYork',
    'curiousBlue'
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
    layers: number = 5,
    reverse = false
  ) {
    const layersLength = this.defaultLayers.length
    for (let i = layers; i > 0; i--) {
      const layer = this.defaultLayers[reverse ? (i - 1) + (layersLength - layers) : i - 1] as colors
      this.data.forEach(({ x, y }) => {
        this.drawPoint({ x, y }, layer, .8)
      })
    }
  }

  protected drawCircle(
    x: number,
    y: number,
    radius: number,
    {
      color,
      blurSize = this.defaultBlurSize,
      shadowBlur = 0
    }: DrawCircleOptions
  ) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.filter = `blur(${blurSize})`
    this.ctx.shadowBlur = shadowBlur
    this.ctx.shadowColor = '#191A2E'
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.closePath()
  }

  private drawPoint({ x, y }: HeatmapData, colorName: colors, opacity = 1) {
    const { size, color, blurSize, shadowBlur } = this.defaultSizes[colorName]
    this.drawCircle(x, y, size, {
      color: typeof color === 'string' ? color : calcRGB(color, opacity).rgba,
      blurSize,
      shadowBlur
    })
  }
}

export default Heatmap
