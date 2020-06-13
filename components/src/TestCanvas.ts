import * as THREE from 'three'

export default class TestCanvas {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  size: {width: number, height: number};

  cube: THREE.Mesh;

  constructor($canvas: HTMLCanvasElement) {
    this.size = {width:600, height:480};
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.size.width/this.size.height, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    });

    this.camera.position.set(0,3,-10);
    this.camera.lookAt(this.scene.position);

    const light = new THREE.PointLight("#fff", 2);
    light.position.set(-2, 2, -2)
    this.scene.add(light);

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshLambertMaterial({color:"#f33"});
    // const mesh = new THREE.Mesh(geometry, material);
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0,0,0);

    this.scene.add(this.cube);

    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.size.width, this.size.height);

    this.loop();
  }

  loop() {
    this.render();
    this.cube.rotateY(0.02);
    // THREE.ro
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}