import { useRef, useCallback, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../../utils/draw";
import EstimatePose from "../../utils/estimate-pose";
import AbsoluteArea from "./absolute-area";

const ExerciseScreen = ({ type, setNowCount, isReady, time }) => {
  const [count, step, checkPoses] = EstimatePose(type);

  useEffect(() => {
    setNowCount(count);
  }, [count, setNowCount]);

  const checkPose = useCallback((pose) => checkPoses(pose), [checkPoses]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const videoWidth = 640;
  const videoHeight = 480;

  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  const detectWebcam = async (posenet) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await posenet.estimateSinglePose(video);

      checkPose(pose);

      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const runPosenet = async () => {
    const posenetModel = await posenet.load({
      inputResolution: { width: videoWidth, height: videoHeight },
      scale: 0.8,
    });

    setInterval(() => {
      detectWebcam(posenetModel);
    }, 200);
  };

  useEffect(() => {
    if (isReady) {
      runPosenet();
    }
  }, [isReady]);

  return (
    <div>
      <AbsoluteArea step={step} time={time} />
      <Webcam ref={webcamRef} className="absolute w-[640px] h-[480px] top-[23%] left-[33%]" />
      <canvas ref={canvasRef} className="absolute w-[640px] h-[480px] top-[23%] left-[33%] scale-[(-1, 1)] translate-[(-200, 0)]" />
    </div>
  );
};

export default ExerciseScreen;
