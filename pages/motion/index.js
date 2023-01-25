import CommonLayout from '../../components/layout/CommonLayout';
import { useRef, useEffect, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';
import { drawKeypoints, drawSkeleton } from '../../utils/draw'
import Squat from '../../utils/detect-pose/squat';
import MotionResult from '../../components/modal/motionResult';
import { useRouter } from 'next/router';
import axios from 'axios';

const _TIME = 5;

const Motion = () => {
  const router = useRouter();
  const { type } = router.query;

  const [count, step, checkPoses] = Squat();
  const [time, setTime] = useState(_TIME);
  const [isStart, setIsStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [ready, setReady] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [open, setOpen] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
  };


  async function detectWebcam(posenet) {
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      
      const pose = await posenet.estimateSinglePose(video);
      
      checkPoses(pose);

      drawResult(pose, video, videoWidth, videoHeight, canvasRef); // canvas에 그리기
    }
  }

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });

    setInterval(() => {
      detectWebcam(net);
    }, 200)
  }

  const onClickStartButton = () => {
    setIsReady(true);
  }
  
  const onClickResetButton = () => {
    setIsStart(false);
    setTime(_TIME);
    setOpen(false);
    setIsFinished(false);
    setReady(5);
  }
  
  const onClickSaveButton = () => {
    console.log(type, count, _TIME, count);
    if (window.confirm(
      `저장하시겠습니까? \n운동명 : ${type}, 시간 : ${_TIME}, 개수 : ${count}, 점수 : ${count}`
    )) {
      axios
        .post('motion/save', { type: type, count: count, time: _TIME, score: count }, { withCredentials: true })
        .then((res) => onClickResetButton())
        .catch((err) => console.error(err));
    }
    
  }
  
  useEffect(() => {
    if (isStart && time !== 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
        clearInterval(timer);
      }, 1000)
    } else if (time === 0) {
      setIsFinished(true);
    }
  }, [isStart, time])
  
  useEffect(() => {
    if (isFinished) {
      setOpen(true);
    }
  }, [isFinished, open])

  useEffect(() => {
    if (isReady && ready !== 0) {
      const timer = setInterval(() => {
        setReady(ready - 1);
        clearInterval(timer);
      }, 1000)
    } else if (ready === 0) {
      setIsStart(true);
      setIsReady(false);
    }
  }, [isReady, ready])

  useEffect(() => {
    if (isReady) {
      runPosenet();
    }
  }, [isReady])
  
  return (
    <CommonLayout>
      <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-neutral-200 rounded-lg">
        {isReady && <div className="absolute w-[500px] h-[500px] text-[300px] z-10 bg-op rounded-full">
          <label className="flex w-full h-full justify-center items-center opacity-100 text-white">
            {ready}
          </label>
        </div>}
        
        <div className="absolute w-1/3 h-[8%] text-3xl mb-[35%] bg-button justify-center items-center flex-col rounded-lg text-white shadow-shadow">
          <label className="flex w-full h-full justify-center items-center">다음 동작 : {step ? "↑" : "↓"}</label>
        </div> 
        <div className="absolute ml-[66%] w-[200px] h-[200px] bg-black text-white rounded-full mb-5 text-7xl justify-center items-center">
          <label className="flex w-full h-full justify-center items-center">{time}<label className="flex text-lg">초</label></label></div>
        <div className="flex w-2/3 h-4/5 shadow-shadow bg-white justify-center items-center rounded-xl">
          <Webcam ref={webcamRef} className="absolute w-[640px] h-[480px] mb-12" />  
          <canvas ref={canvasRef} className="absolute w-[640px] h-[480px] mb-12" />
          <div className="flex mt-[42%] w-1/5 h-[10%] justify-center items-center bg-button rounded-lg shadow-shadow text-white flex-row text-2xl mx-10 opacity-80">
            <label className="flex w-1/2 h-full justify-center items-center">
              총 개수 : 
            </label>
            <label className="flex w-1/4 h-3/5 bg-black text-white justify-center items-center ml-3 rounded-lg">{count}</label>
          </div>
          <button className="flex mt-[42%] mx-10 w-[150px] h-[10%] justify-center items-center text-white rounded-lg bg-button text-2xl shadow-shadow" onClick={() => onClickStartButton()}>START</button>  
        </div>
        <MotionResult open={open} onClose={() => setOpen(true)} count={count} _TIME={_TIME} onClickResetButton={() => onClickResetButton()} onClickSaveButton={() => onClickSaveButton()} type={type}/>
      </div>
    </CommonLayout>
  );
};

export default Motion;
