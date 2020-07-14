import * as THREE from "three";

import * as Renderable from "./IRenderable";
import { IFaceDataSettable } from "./IFaceDataSettable";

import { FaceMeshFaceGeometry } from "./FacemeshFaceGeometry/face";

import * as facemesh from "@tensorflow-models/facemesh";
import { BufferAttribute, BufferGeometry, Vector3 } from "three";

export class FaceCanvas {
  public canvas?: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;

  private camera: THREE.OrthographicCamera;

  private face_obj: THREE.Mesh;
  private face_geometry: FaceMeshFaceGeometry;

  private canvas_width:number;
  private canvas_height: number;

  private isCanvasSetted: boolean;
  private isCanvasSizeSetted: boolean;

  constructor() {
    // initialize
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1);
    this.face_geometry = new FaceMeshFaceGeometry({
      normalizeCoords: false,
      useVideoTexture: false
    });
    let face_mat = new THREE.MeshStandardMaterial({
      color: "#666"
    });
    this.face_obj = new THREE.Mesh(this.face_geometry, face_mat);

    this.scene.add(this.face_obj);

    let light = new THREE.AmbientLight("#fff", 1.0);
    this.scene.add(light);

    this.canvas_width = 0;
    this.canvas_height = 0;

    this.isCanvasSetted = false;
    this.isCanvasSizeSetted = false;
  }

  constructCanvas(canvas: HTMLCanvasElement): void {
    this.canvas!.width = this.canvas_width;
    this.canvas!.height = this.canvas_height;
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    this.renderer.setClearColor("#44aaaa");
    this.renderer.setSize(this.canvas_width, this.canvas_height);

    this.camera = new THREE.OrthographicCamera(
      -this.canvas_width / 2.0,
      this.canvas_width / 2.0,
      this.canvas_height / 2.0,
      -this.canvas_height / 2.0
    );

    this.face_geometry.setSize(this.canvas_width, this.canvas_height);
    
    this.camera.updateProjectionMatrix();
  }

  setCanvas(canvas: HTMLCanvasElement):void {
    this.canvas = canvas;
    this.isCanvasSetted = true;

    if(this.isCanvasSizeSetted){
      this.constructCanvas(canvas);
    }
  }

  setCanvasSize(width: number, height: number):void {
    this.canvas_width = width;
    this.canvas_height = height;
    this.isCanvasSizeSetted = true;
    if(this.isCanvasSetted){
      this.constructCanvas(this.canvas!);
    }
  }
  
  render(canvas: HTMLCanvasElement): void {
    this.renderer.domElement = canvas;
    this.renderer.render(this.scene, this.camera);
  }
  loop(): void {
    // this.render();
    requestAnimationFrame(this.loop);
  }
  setFaceData(face: facemesh.AnnotatedPrediction): void {
    this.face_geometry.update(face, false);

    // この処理いるのか？
    (<BufferAttribute>(
      (<BufferGeometry>this.face_obj.geometry).attributes.position
    )).needsUpdate = true;
  }
}
