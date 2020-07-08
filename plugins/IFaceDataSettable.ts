import * as facemesh from "@tensorflow-models/facemesh";

export interface IFaceDataSettable {
  setFaceData(face: facemesh.AnnotatedPrediction): void;
}
