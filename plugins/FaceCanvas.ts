import * as THREE from "three";

import * as Renderable from "./IRenderable";
import { IFaceDataSettable } from "./IFaceDataSettable";

import { FaceMeshFaceGeometry } from "./FacemeshFaceGeometry/face";

import * as facemesh from "@tensorflow-models/facemesh";
import { BufferAttribute, BufferGeometry, Vector3 } from "three";

export class FaceCanvas implements Renderable.IRenderable, IFaceDataSettable {
  private canvas?: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;

  private camera: THREE.OrthographicCamera;

  private face_obj: THREE.Mesh;
  private face_geometry: FaceMeshFaceGeometry;

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

    // TODO: scene creation

    this.scene.add(this.face_obj);

    let light = new THREE.AmbientLight("#fff", 1.0);
    this.scene.add(light);
  }
  setCanvas(canvas: Renderable.CanvasParameters): void {
    this.canvas = canvas.canvas;
    this.canvas!.width = canvas.width;
    this.canvas!.height = canvas.height;
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.canvas
    });

    this.renderer.setClearColor("#44aaaa");
    this.renderer.setSize(this.canvas.width, this.canvas.height);

    this.camera = new THREE.OrthographicCamera(
      -canvas.width / 2.0,
      canvas.width / 2.0,
      canvas.height / 2.0,
      -canvas.height / 2.0
    );

    this.face_geometry.setSize(this.canvas.width, this.canvas.height);
    
    this.camera.updateProjectionMatrix();
  }
  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
  loop(): void {
    this.render();
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
