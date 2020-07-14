import Vue from "vue";

export class FacemeshVideo {
  size: { w: number; h: number };
  resolution: { w: number; h: number };
  autoplay: boolean;
  inited: boolean;

  constructor() {
    this.size = { w: 640, h: 480 };
    this.resolution = { w: 1920, h: 1080 };
    this.autoplay = true;
    this.inited = false;
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
        // width: { ideal: this.resolution.w },
        // height: { ideal: this.resolution.h },
        deviceId: "aeaa5ef31b7e86653889fb6d59fc2b6772c14567c8df06895d4b0312b9bb5d55",
        facingMode: "user"
      }
    });
  }

  initVideoObject(video: HTMLVideoElement) {
    console.log("video init!")
    video.width = this.size.w;
    video.height = this.size.h;
    video.autoplay = this.autoplay;

    this.getWebCamStream()
      .then(stream => {
        video.srcObject = stream;
        this.inited = true;
      })
      .catch(err => console.log(err));
  }
}