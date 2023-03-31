import NextImage from "next/image";
import camera from "../../public/camera.png";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import MyCanvas from "../layout/MyCanvas";

const LeftSide = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const canvasRef = useRef(null);

  const onChangeImage = async (file) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);

      img.height *= canvas.width / img.width;
      img.width *= canvas.width / img.width;
      canvas.height = img.height;
      canvas.width = img.width;

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = URL.createObjectURL(file);
  };

  const predict = async () => {
    const img = canvasRef.current;
    await cocoSsd
      .load({
        base: "mobilenet_v2",
      })
      .then((model) => {
        const tensor = tf.browser.fromPixels(img);
        model.detect(tensor, 20, 0.1).then((prediction) => {
          setPredictions(prediction.filter((value) => value.class === "bowl"));
        });
      });
  };

  const drawCanvas = (predictions) => {
    const img = canvasRef.current;
    const ctx = img.getContext("2d");

    predictions.forEach((prediction) => {
      if (prediction.class === "bowl") {
        const [x, y, width, height] = prediction.bbox;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = "#FF00FF";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    if (image) {
      onChangeImage(image);
    }
  }, [image]);

  useEffect(() => {
    if (predictions) {
      drawCanvas(predictions);
    }
  }, [predictions]);

  return (
    <div className="flex flex-col w-2/5 h-full items-center justify-center">
      {image ? (
        <div className="flex w-full h-1/2 items-center justify-center">
          <canvas ref={canvasRef} alt="image" className="absolute" width={450} />
        </div>
      ) : (
        <label className="flex flex-col w-[80%] h-[50%] items-center justify-center bg-neutral-200 rounded-2xl shadow-shadow cursor-pointer">
          <NextImage src={camera} width={180} height={180} alt="camera" />
          여기를 눌러 이미지를 첨부합니다.
          <input type="file" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>
      )}
      <div className="flex flex-row w-[90%] justify-around">
        <button
          className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition"
          onClick={() => setImage("")}
        >
          초기화
        </button>
        <button
          className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition"
          onClick={predict}
        >
          식탁 분석
        </button>

        <button className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition">
          정보 등록
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        {predictions &&
          predictions.map((value, index) => {
            const [x, y, width, height] = value.bbox;
            console.log(index);
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default LeftSide;
