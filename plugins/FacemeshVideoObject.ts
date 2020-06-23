import Vue from "vue";

export class FacemeshVideo {
  size: { w: number; h: number };
  resolution: { w: number; h: number };
  autoplay: boolean;

  constructor() {
    this.size = { w: 360, h: 240 };
    this.resolution = { w: 1920, h: 1080 };
    this.autoplay = true;
  }

  setSize(size: { w: number; h: number }) {
    this.size = size;
  }

  setResolution(resolution: { w: number; h: number }) {
    this.resolution = resolution;
  }

  getWebCamStream(): Promise<MediaStream> {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      devices.forEach(device => {
        console.log("Hello");

        console.log(device.deviceId, device.label);
      });
    });

    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: this.resolution.w },
        height: { ideal: this.resolution.h },
        deviceId:
          "13b3f5df683da62be8c9420de88d49cf681a769a642ec1d02667feab43731eed",
        facingMode: "user"
      }
    });
  }

  initVideoObject(video: HTMLVideoElement) {
    video.width = this.size.w;
    video.height = this.size.h;
    video.autoplay = this.autoplay;

    this.getWebCamStream()
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => console.log(err));
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $facemeshVideo: FacemeshVideo;
  }
}

export default ({ app }: { app: any }, inject: any) => {
  inject("facemeshVideo", new FacemeshVideo());
};
