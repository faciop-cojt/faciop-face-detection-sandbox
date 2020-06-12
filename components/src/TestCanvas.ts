import * as THREE from 'three'

export default class TestCanvas {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  size: {width: number, height: number};

  constructor($canvas: HTMLCanvasElement) {
    this.size = {width:600, height:480};
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.size.height/this.size.width, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    });

    this.camera.position.set(0,3,-10);
    this.camera.lookAt(this.scene.position);

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshLambertMaterial({color:"#f33"});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,0);

    this.scene.add(mesh);

    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.size.width, this.size.height);
  }

  loop() {
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}