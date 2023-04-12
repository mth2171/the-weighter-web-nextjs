import { useState } from "react";
import CommonLayout from "../components/layout/CommonLayout";
import LeftSide from "../components/food/left-side";
import RightSide from "../components/food/right-side";
import Background from "../components/food/background";
import { useRef } from "react";

const Food = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const canvasRef = useRef(null);
  return (
    <CommonLayout>
      <Background>
        <LeftSide image={image} setImage={setImage} predictions={predictions} setPredictions={setPredictions} canvasRef={canvasRef} />
        <RightSide image={image} predictions={predictions} canvasRef={canvasRef} />
      </Background>
    </CommonLayout>
  );
};

export default Food;
