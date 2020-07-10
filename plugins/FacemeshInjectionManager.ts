import * as facemesh from '@tensorflow-models/facemesh'

import {FaceCanvas} from './FaceCanvas'
import {FacemeshProvider} from './FacemeshProvider'
import {FacemeshVideo} from './FacemeshVideoObject'

let face_canvas = new FaceCanvas();
let facemesh_provider = new FacemeshProvider();
let facemesh_video = new FacemeshVideo();


declare module "vue/types/vue" {
  interface Vue {
    $facecanvas: FaceCanvas
  }
}
declare module "vue/types/vue" {
  interface Vue {
    $facemeshVideo: FacemeshVideo
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("facecanvas", face_canvas);
  // inject("facemeshProcider", facemesh_provider);
  inject("facemeshVideo", facemesh_video)
};
