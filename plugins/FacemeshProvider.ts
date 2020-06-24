import * as facemesh from "@tensorflow-models/facemesh";

import Vue from "vue";

export class FacemeshProvider {
  model: Promise<facemesh.FaceMesh>;

  constructor() {
    this.model = facemesh.load();
  }

  getFacemeshPoints(video: HTMLVideoElement) {
    this.model.then(model => {
      model.estimateFaces(video)
      .then(prediction=>{
        console.log(prediction);
        
      })
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
