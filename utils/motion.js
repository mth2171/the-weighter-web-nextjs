import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "../utils/utilites";

export const runPosenet = async (webcamRef, canvasRef) => {
  // Posenet 라이브러리 호출
  const net = await posenet.load({
    inputResolution: { width: 640, height: 480 },
    scale: 0.5,
  });

  // 호출 완료 시 인식 (초당 10회)
  setInterval(() => {
    detect(webcamRef, canvasRef, net);
  }, 100);
};

export const detect = async (webcamRef, canvasRef, net) => {
  if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
    // Webcam에서 비디오 정보 가져오기
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // 비디오 길이, 높이 설정
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // 인식 함수 실행
    const pose = await net.estimateSinglePose(video);
    console.log(pose);

    drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  }
};

// 캔버스 그리기
export const drawCanvas = (pose, video, videoWidth, videoHeight, canvasRef) => {
  // 캔버스 사이즈 조절 -> 비디오 사이즈와 동일하게
  const ctx = canvasRef.current.getContext("2d");
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  // 각 관절 당 50% 정확도 이상 시 점 찍기
  drawKeypoints(pose["keypoints"], 0.6, ctx);

  // 각 관절 당 50% 정확도 이상 시 선 긋기
  drawSkeleton(pose["keypoints"], 0.6, ctx);
};
