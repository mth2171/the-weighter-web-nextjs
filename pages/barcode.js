import { useEffect, useState } from "react";
import camera from "../public/camera.png";
import { barcodeRequest, infoRequest } from "../utils/request";
import Quagga from "quagga";
import Image from "next/image";
import CommonLayout from "../components/layout/CommonLayout";

const Barcode = () => {
  const [src, setSrc] = useState("");
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({});

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setSrc(reader.result);
        resolve();
      };
    });
  };

  const decode = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    Quagga.decodeSingle(
      {
        decoder: { readers: ["ean_reader"] },
        size: 640,
        locator: { patchSize: "small", halfSample: false },
        src,
      },
      function (result) {
        if (result.codeResult) {
          setBarcode(result.codeResult.code);
        } else {
          console.log("not detected");
        }
      }
    );
    encodeFileToBase64(e.target.files[0]);
  };

  const onClickBarcodeButton = () => {
    if (barcode) {
      barcodeRequest
        .get("BAR_CD=" + barcode)
        .then((res) => {
          setName(res.data.C005.row[0].PRDLST_NM);
        })
        .catch((err) => console.error(err));
    } else {
      alert("바코드를 먼저 인식해주세요");
    }
  };

  useEffect(() => {
    infoRequest
      .get("getFoodNtrItdntList1?serviceKey=" + process.env.NEXT_PUBLIC_PRODUCT_KEY + "&desc_kor=" + name + "&type=json")
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, [name]);

  useEffect(() => {
    onChangeData(data, setShowData);
  }, [data]);

  const onChangeData = (data, setShowData) => {
    if (!data) {
      setData([]);
    } else {
      const newObj = {};
      newObj["제품명"] = data["DESC_KOR"];
      newObj["제조업체"] = data["ANIMAL_PLANT"];
      newObj["1회제공량 (g)"] = data["SERVING_WT"];
      newObj["열량 (kcal)"] = data["NUTR_CONT1"];
      newObj["탄수화물 (g)"] = data["NUTR_CONT2"];
      newObj["단백질 (g)"] = data["NUTR_CONT3"];
      newObj["지방 (g)"] = data["NUTR_CONT4"];
      newObj["당류 (g)"] = data["NUTR_CONT5"];
      newObj["나트륨 (mg)"] = data["NUTR_CONT6"];
      newObj["콜레스테롤 (g)"] = data["NUTR_CONT7"];
      newObj["포화지방산 (g)"] = data["NUTR_CONT8"];
      newObj["트랜스지방산 (g)"] = data["NUTR_CONT9"];
      setShowData(newObj);
    }
  };

  return (
    <CommonLayout>
      <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-gray-200">
        <div className="flex w-4/5 h-[80%] bg-white rounded-2xl items-center justify-center shadow-shadow">
          <div className="flex w-[30%] h-full flex-col items-center justify-center">
            {src ? (
              <Image src={src} className="w-full rounded-2xl" alt="src"/>
            ) : (
              <label className="flex w-[23vw] h-[23vw] bg-gray-200 rounded-2xl shadow-shadow items-center justify-center flex-col cursor-pointer">
                <Image src={camera} width={200} height={200} alt="camera"/>
                클릭하여 이미지를 첨부합니다.
                <input type="file" className="hidden" accept="image/*" onChange={(e) => decode(e)}></input>
              </label>
            )}
            <label>{barcode}</label>
            <div className="flex w-full flex-row justify-around">
              <button
                className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition"
                onClick={onClickBarcodeButton}
              >
                바코드 분석
              </button>
              <button className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition">
                영양정보 등록
              </button>
            </div>
          </div>
          <div className="flex w-3/5 h-full flex-col items-center justify-center">
            <div className="flex w-[90%] h-4/5 bg-gray-200 rounded-lg p-5 flex-col overflow-auto">
              <div className="flex w-[20%] h-[10%] p-5 bg-gray-400 items-center justify-center text-[25px] rounded-lg text-[550] mb-5">분석 결과</div>
              {showData &&
                Object.keys(showData).map((value, key) => (
                  <div key={showData.value} className="flex w-full h-2/5 justify-center items-center flex-row mb-5">
                    <div className="flex w-1/4 h-10 justify-center items-center bg-gray-400">{value}</div>
                    <div className="flex w-2/4 h-10 justify-center items-center bg-white">{showData[value] === "N/A" ? 0.0 : showData[value]}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Barcode;
