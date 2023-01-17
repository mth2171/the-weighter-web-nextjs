import Image from "next/image";
import CommonLayout from "../components/layout/CommonLayout";
import info1 from "../public/info1.png";
import info2 from "../public/info2.png";
import info3 from "../public/info3.png";

const info = () => {
  return (
    <CommonLayout>
      <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-gray-200 rounded-lg">
        <div className="flex justify-center items-center rounded-2xl shadow-shadow mr-[5%] m-4">
          <div className="flex w-[12vw] h-[12vw] rounded-l-lg">
            <Image src={info1} className="w-full" alt="info1"/>
          </div>
          <div className="flex w-[60vw] h-[12vw] flex-col">
            <div className="flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg">
              <label className="ml-5">AI 식단 추천</label>
            </div>
            <div className="flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg">
              <label>사용자의 식단을 지속적으로 학습하여 AI가 평균적인 식단을 분석 후 사용자에게 부족한 영양소 등을 보충한</label>
              <label>식단을 추천해 주어 편항적인 식습관을 개선할 수 있습니다.</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-2xl shadow-shadow ml-[5%] m-4">
          <div className="flex w-[12vw] h-[12vw] rounded-l-lg">
            <Image src={info2} className="w-full" alt="info2"/>
          </div>
          <div className="flex w-[60vw] h-[12vw] flex-col">
            <div className="flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg">
              <label className="ml-5">바코드를 촬영하여 영양 성분 확인</label>
            </div>
            <div className="flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg">
              <label>식품에 붙어 있는 바코드를 촬영할 시 식별번호를 확인 후 해당 식품의 영양 성분을 확인할 수 있습니다.</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-2xl shadow-shadow mr-[5%] m-4">
          <div className="flex w-[12vw] h-[12vw] rounded-l-lg">
            <Image src={info3} className="w-full" alt="info3"/>
          </div>
          <div className="flex w-[60vw] h-[12vw] flex-col">
            <div className="flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg">
              <label className="ml-5">운동 정보 제공</label>
            </div>
            <div className="flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg">
              <label>운동 코드, 홈 트레이닝 일상생활에서 손 쉽게 접근 가능한 운동 방법이나 자격증 취득을 위한 필수 조건,</label>
              <label>시험 내용 등의 정보를 사용자에게 제공합니다.</label>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default info;
