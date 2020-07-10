import * as facemesh from '@tensorflow-models/facemesh'

import {FaceCanvas} from './FaceCanvas'

let face_canvas = new FaceCanvas();

declare module "vue/types/vue" {
  interface Vue {
    $facecanvas: FaceCanvas;
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("facecanvas", face_canvas);
};
