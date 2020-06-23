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
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: this.resolution.w },
        height: { ideal: this.resolution.h }
      }
    });
  }

  initVideoObject(video: HTMLVideoElement) {
    video.width = this.resolution.w;
    video.height = this.resolution.h;
    video.autoplay = this.autoplay;

    this.getWebCamStream().then(stream=>{
      video.srcObject = stream;
    })
  }
}
