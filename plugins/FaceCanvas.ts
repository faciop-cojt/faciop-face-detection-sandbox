import * as THREE from "three";

import { FaceMeshFaceGeometry } from "./FacemeshFaceGeometry/face";

import * as facemesh from "@tensorflow-models/facemesh";

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"


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

  private glasses?: THREE.Object3D;

  constructor() {
    // initialize
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1);
    this.face_geometry = new FaceMeshFaceGeometry({
      normalizeCoords: false,
      useVideoTexture: false
    });


    let vertex_shader = "void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
    let frag_shader = "void main(){ gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); }"
    // let face_mat = new THREE.MeshStandardMaterial({
    //   color: "#fff",
    //   visible: false
    // });
    let face_mat = new THREE.ShaderMaterial({
      vertexShader: vertex_shader,
      fragmentShader: frag_shader
    })
    this.face_obj = new THREE.Mesh(this.face_geometry, face_mat);

    this.scene.add(this.face_obj);

    let light = new THREE.DirectionalLight("#fff", 1.0);
    light.position.set(1,1,1);
    light.lookAt(new THREE.Vector3(0,0,0));
    this.scene.add(light);

    this.canvas_width = 0;
    this.canvas_height = 0;

    this.isCanvasSetted = false;
    this.isCanvasSizeSetted = false;

    let loader = new GLTFLoader().load(
      "/faciop-face-detection-sandbox/glasses.glb",
      // "/glasses.glb",
      (data)=>{
        const gltf = data;
        this.glasses = gltf.scene;
        this.glasses.scale.set(3,3,3);
        this.scene.add(this.glasses);
        console.log("glft loaded");
        
     },
     (xhr)=>{

     },
     (err)=>{
       console.log(err);
       
     }
    )


  }

  constructCanvas(): void {
    this.canvas!.width = this.canvas_width;
    this.canvas!.height = this.canvas_height;
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    });

    // this.renderer.setClearColor("#44aaaa")
    this.renderer.setClearAlpha(0);
    this.renderer.setSize(this.canvas_width, this.canvas_height);

    this.camera = new THREE.OrthographicCamera(
      -this.canvas_width / 2.0,
      this.canvas_width / 2.0,
      this.canvas_height / 2.0,
      -this.canvas_height / 2.0,
    );
    this.camera.position.set(0,0,100);


    this.face_geometry.setSize(this.canvas_width, this.canvas_height);
    
    this.camera.updateProjectionMatrix();
    
  }

  setCanvas(canvas: HTMLCanvasElement):void {
    this.canvas = canvas;
    this.isCanvasSetted = true;

    if(this.isCanvasSizeSetted){
      this.constructCanvas();
    }
  }

  setCanvasSize(width: number, height: number):void {
    this.canvas_width = width;
    this.canvas_height = height;
    this.isCanvasSizeSetted = true;
    if(this.isCanvasSetted){
      this.constructCanvas();
    }
  }
  
  render(): void {
    this.glasses?.position.copy(this.face_geometry.track(168,122,351).position);
    this.glasses?.rotation.setFromRotationMatrix(this.face_geometry.track(168,122,351).rotation)
    this.glasses?.rotateY(3.14);
    
    this.renderer.render(this.scene, this.camera);
  }
  setFaceData(face: facemesh.AnnotatedPrediction): void {
    this.face_geometry.update(face, false);

    // この処理いるのか？
    (<THREE.BufferAttribute>(
      (<THREE.BufferGeometry>this.face_obj.geometry).attributes.position
    )).needsUpdate = true;
  }
}
