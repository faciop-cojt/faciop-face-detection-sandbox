export interface CanvasParameters {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export interface IRenderable {
  setCanvas(canvas: HTMLCanvasElement): void;
  setCanvasSize(width: number, height: number): void;
  render(): void;
  loop(): void;
}
