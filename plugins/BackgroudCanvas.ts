import * as THREE from "three";

export class BackgroudCanvas {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  size: { width: number; height: number };

  cube: THREE.Mesh;

  facemesh: THREE.Points;
  face_geometry: THREE.Geometry;

  constructor() {
    this.size = { width: window.innerWidth, height: window.innerHeight };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.width / this.size.height,
      0.01,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();

    this.camera.position.set(0, 0, -20);
    this.camera.lookAt(this.scene.position);

    const ambientLight = new THREE.AmbientLight("##fff", 0.5);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight("#fff", 0.7);
    light.position.set(-2, 2, -2);
    this.scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "#fff" });
    // const mesh = new THREE.Mesh(geometry, material);
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 0, 0);
    light.target = this.cube;

    this.face_geometry = new THREE.Geometry();
    for(let i=0; i<463; i++){
      this.face_geometry.vertices.push(new THREE.Vector3(0,0,0))
    }
    this.face_geometry.verticesNeedUpdate = true;
    const face_mat = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x000
    })
    this.facemesh = new THREE.Points(this.face_geometry, face_mat);

    this.scene.add(this.cube);
    this.scene.add(this.facemesh)

    this.renderer.setClearColor("#8ed7d7");
    this.renderer.setSize(this.size.width, this.size.height);

    // this.loop();
  }

  initRenderer(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas
    });
    this.renderer.setClearColor("#8ed7d7");
    this.renderer.setSize(this.size.width, this.size.height);
  }

  setFacemeshPoints(points: number[][]){
    this.face_geometry.vertices = [];
    points
    .forEach(point => {
      this.face_geometry.vertices.push(
        new THREE.Vector3(-point[0]/100, -point[1]/100, point[2]/100)
      );
    });
    this.face_geometry.verticesNeedUpdate = true;
  }

  loop() {
    // console.log(this.face_geometry.vertices);
    
    this.cube.rotateY(0.02);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $backgroundCanvas: BackgroudCanvas;
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("backgroundCanvas", new BackgroudCanvas());
};
