import * as THREE from "three";

import * as Renderable from "./IRenderable";
import { IFaceDataSettable } from "./IFaceDataSettable";

export class FaceCanvas implements Renderable.IRenderable, IFaceDataSettable {
  private canvas?: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;

  private camera?: THREE.OrthographicCamera;

  constructor(canvas?: Renderable.CanvasParameters | undefined) {
    this.canvas = canvas?.canvas || undefined;
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();

    if(canvas?.width && canvas?.height){
      this.camera = new THREE.OrthographicCamera(
        -canvas.width/2.0, canvas.width/2.0, canvas.height/2.0, -canvas.height/2.0
      );
    }

  }
  setCanvas(canvas: Renderable.CanvasParameters): void {
    throw new Error("Method not implemented.");
  }
  render(): void {
    throw new Error("Method not implemented.");
  }
  loop(): void {
    throw new Error("Method not implemented.");
  }
  setFaceData(
    face: import("@tensorflow-models/facemesh").AnnotatedPrediction
  ): void {
    throw new Error("Method not implemented.");
  }
}
