import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";

import { version } from "@tensorflow/tfjs-backend-wasm/dist/version";

import Vue from "vue";

export class FacemeshProvider {
  model!: facemesh.FaceMesh;

  constructor() {
    facemesh.load({ maxFaces: 1 }).then(facemesh => {
      this.model = facemesh;
    });

    tfjsWasm.setWasmPath(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${version}/dist/tfjs-backend-wasm.wasm`,
      true
    );
    tf.setBackend("wasm");
  }

  async getFacemeshPointsAsync(video: HTMLVideoElement) {    
    return new Promise<facemesh.AnnotatedPrediction[]>((resolve, reject) => {
      if (this.model == undefined) resolve([]);
      this.model
        .estimateFaces(video)
        .then(prediction => {
          resolve(prediction);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
