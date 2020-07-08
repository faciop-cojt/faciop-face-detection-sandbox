export interface CanvasParameters {
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
}

export interface IRenderable {
  initRender(canvas?: CanvasParameters): void;
  setCanvas(canvas: CanvasParameters): void;
  render(): void;
  loop(): void;
}
