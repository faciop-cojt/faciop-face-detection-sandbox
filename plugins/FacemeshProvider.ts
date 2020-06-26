import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import Stats from "stats.js";

import { version } from "@tensorflow/tfjs-backend-wasm/dist/version";

import Vue from "vue";

export class FacemeshProvider {
  model: facemesh.FaceMesh;
  stats: Stats;

  constructor() {
    facemesh.load({maxFaces: 1})
    .then((facemesh) => {
      this.model = facemesh;
    });

    this.stats = new Stats();
    console.log(version);
    
    tfjsWasm.setWasmPath(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${version}/dist/tfjs-backend-wasm.wasm`,
      true
    );
    tf.setBackend("wasm");
  }

  getFacemeshPoints(video: HTMLVideoElement) {
      this.model.estimateFaces(video).then(prediction => {
        console.log(prediction);
      })
      .catch(err=>{
        console.log(err);
        
      })
      
    };

  getFacemeshPointsAsync(video: HTMLVideoElement){

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
