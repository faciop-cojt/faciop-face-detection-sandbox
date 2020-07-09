export interface CanvasParameters {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export interface IRenderable {
  setCanvas(canvas: CanvasParameters): void;
  render(): void;
  loop(): void;
}
