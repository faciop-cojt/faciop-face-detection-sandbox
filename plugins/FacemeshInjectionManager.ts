import * as facemesh from "@tensorflow-models/facemesh";

import { FaceCanvas } from "./FaceCanvas";
import { FacemeshProvider } from "./FacemeshProvider";
import { FacemeshVideo } from "./FacemeshVideoObject";

let face_canvas = new FaceCanvas();
let facemesh_provider = new FacemeshProvider();
let facemesh_video = new FacemeshVideo();

let canvas_width: number = 0;
let canvas_height: number = 0;

let videoReady = (video: HTMLVideoElement): void => {
  canvas_width = video.width;
  canvas_height = video.height;

  face_canvas.setCanvasSize(canvas_width, canvas_height);
};
let canvasReady = (canvas: HTMLCanvasElement) => {
  face_canvas.setCanvas(canvas);
};

declare module "vue/types/vue" {
  interface Vue {
    $facecanvas: FaceCanvas;
    $facemeshVideo: FacemeshVideo;
    $facemeshProvider: FacemeshProvider;
    $video_ready(video: HTMLVideoElement): void;
    $canvas_ready(video: HTMLCanvasElement): void;
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("facecanvas", face_canvas);
  inject("facemeshProvider", facemesh_provider);
  inject("facemeshVideo", facemesh_video);
  inject("video_ready", videoReady);
  inject("canvas_ready", canvasReady);
};
