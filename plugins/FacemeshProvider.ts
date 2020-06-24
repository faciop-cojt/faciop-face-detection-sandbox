import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core"
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm"
import Stats from "stats.js"

import Vue from "vue";

export class FacemeshProvider {
  model: Promise<facemesh.FaceMesh>;
  stats: Stats

  constructor() {
    this.model = facemesh.load();
    this.stats = new Stats();
    tf.setBackend('wasm');
  }

  getFacemeshPoints(video: HTMLVideoElement) {
    this.stats.begin();
    this.model.then(model => {
      model.estimateFaces(video)
      .then(prediction=>{
        console.log(prediction);
        
      })
      this.stats.end();
    })
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $facemeshProvider: FacemeshProvider;
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("facemeshProvider", new FacemeshProvider());
};
