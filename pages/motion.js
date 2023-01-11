import { useEffect, useLayoutEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../utils/utilites";

const motion = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Posenet 실행 함수
  const runPosenet = async () => {
    // Posenet 라이브러리 호출
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });

    // 호출 완료 시 인식 (초당 10회)
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // 인식 함수
  const detect = async (net) => {
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
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    // 캔버스 사이즈 조절 -> 비디오 사이즈와 동일하게
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    // 각 관절 당 50% 정확도 이상 시 점 찍기
    drawKeypoints(pose["keypoints"], 0.6, ctx);

    // 각 관절 당 50% 정확도 이상 시 선 긋기
    drawSkeleton(pose["keypoints"], 0.6, ctx);
  };

  runPosenet();

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Contents */}
      <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-gray-200">
        <Webcam ref={webcamRef} className="absolute w-[640px] h-[480px]" />
        <canvas ref={canvasRef} className="absolute w-[640px] h-[480px]" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default motion;
