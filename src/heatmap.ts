interface HeatmapData {
  x: number
  y: number
  value: number
}

export class Heatmap {
  protected data: HeatmapData[]
  protected el: HTMLCanvasElement

  constructor(element: HTMLCanvasElement, data: HeatmapData[]) {
    this.data = data
    this.el = element
  }
}
