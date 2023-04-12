import { useState } from "react";
import MyCanvas from "../layout/MyCanvas";
import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";

const RightSide = ({ canvasRef, predictions }) => {
  const [detail, setDetail] = useState();

  const onClickDetail = async (image) => {
    const model = await tf.loadLayersModel("my_model_구이/model.json");
    const tensor = tf.browser.fromPixels(image).expandDims();
    const resizedTensor = tf.image.resizeBilinear(tensor, [619, 457]);
    const predictions = model.predict(resizedTensor);
    const softmaxOutput = predictions.softmax().dataSync();

    console.log(softmaxOutput);
  };

  return (
    <div className="flex flex-col w-3/5 h-full items-start justify-center">
      <div className="flex w-[15%] h-12 bg-gray-400 items-center justify-center text-[25px] rounded-lg mb-5">
        <div className="flex items-center justify-center ">분석 결과</div>
      </div>
      <div className="flex flex-col w-[90%] h-4/5 bg-gray-200 rounded-lg p-5">
        <div className="flex flex-row w-full overflow-auto">
          {predictions &&
            predictions.map((value, index) => {
              const [x, y, width, height] = value.bbox;
              return (
                <MyCanvas
                  key={index}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  image={canvasRef.current}
                  imageWidth={canvasRef.current.width}
                  imageHeight={canvasRef.current.height}
                  onClick={onClickDetail}
                />
              );
            })}
        </div>
        <div className="flex justify-center items-center">{detail && detail.score}</div>
      </div>
    </div>
  );
};

export default RightSide;
