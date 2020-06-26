import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import Stats from "stats.js";

import { version } from "@tensorflow/tfjs-backend-wasm/dist/version";

import Vue from "vue";

export class FacemeshProvider {
  model: Promise<facemesh.FaceMesh>;
  stats: Stats;

  constructor() {
    this.model = facemesh.load({maxFaces: 1});
    this.stats = new Stats();
    console.log(version);
    
    tfjsWasm.setWasmPath(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${version}/dist/tfjs-backend-wasm.wasm`,
      true
    );
    tf.setBackend("wasm");
  }

  getFacemeshPoints(video: HTMLVideoElement) {
    this.model.then(model => {
      model.estimateFaces(video).then(prediction => {
        console.log(prediction);
      })
      .catch(err=>{
        console.log(err);
        
      })
      
    });
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
