import { useEffect, useState } from "react";
import { barcodeRequest, infoRequest } from "../utils/request";
import Quagga from "quagga";
import CommonLayout from "../components/layout/CommonLayout";
import axios from "axios";
import LeftSide from "../components/barcode/left-side";

const Barcode = () => {
  const [src, setSrc] = useState("");
  const [barcode, setBarcode] = useState(null);
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
          alert("바코드가 인식되지 않았습니다. 다시 시도해주세요.");
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

  const onClickResetButton = () => {
    setSrc("");
    setBarcode("");
    setName("");
    setData([]);
  };

  const onClickSaveButton = () => {
    if (showData["제품명"] && confirm("저장하시겠습니까?")) {
      axios
        .post("/barcode/save", { data })
        .then((res) => {
          console.log(res.data);
          onClickResetButton();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (name) {
      infoRequest
        .get("getFoodNtrItdntList1?serviceKey=" + process.env.NEXT_PUBLIC_PRODUCT_KEY + "&desc_kor=" + name + "&type=json")
        .then((res) => {
          setData(res.data.body.items[0]);
          console.log(res.data.body);
        })
        .catch((err) => console.error(err));
    }
  }, [name]);

  useEffect(() => {
    if (data) {
      onChangeData(data, setShowData);
    }
  }, [data]);

  const onChangeData = (data, setShowData) => {
    if (!data || data.DESC_KOR === "고량미,알곡") {
      setData([]);
    } else {
      const newObj = [];
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
      <div className="flex w-4/5 h-[80%] bg-white rounded-2xl items-center justify-center shadow-shadow">
        <LeftSide src={src} decode={decode} barcode={barcode} onClickBarcodeButton={onClickBarcodeButton} onClickSaveButton={onClickSaveButton} />
        <div className="flex w-3/5 h-full flex-col items-center justify-center">
          <div className="flex w-[90%] h-4/5 bg-gray-200 rounded-lg p-5 flex-col overflow-auto">
            <div className="flex w-[20%] h-[10%] p-5 bg-gray-400 items-center justify-center text-[25px] rounded-lg text-[550] mb-5">분석 결과</div>
            {showData ? (
              Object.keys(showData).map((value, key) => (
                <div key={showData.value} className="flex w-full h-2/5 justify-center items-center flex-row mb-5">
                  <div className="flex w-1/4 h-10 justify-center items-center bg-gray-400">{value}</div>
                  <div className="flex w-2/4 h-10 justify-center items-center bg-white">{showData[value] === "N/A" ? 0.0 : showData[value]}</div>
                </div>
              ))
            ) : (
              <div className="flex text-3xl font-bold">데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Barcode;
