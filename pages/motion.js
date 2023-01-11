import { useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Webcam from "react-webcam";
import { runPosenet } from "../utils/motion";

const motion = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  runPosenet(webcamRef, canvasRef);

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
