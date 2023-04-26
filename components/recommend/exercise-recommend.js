// 운동추천 자식 컴포넌트
import axios from "axios";
import { useState, useEffect } from "react";
import CommonLayout from "../layout/CommonLayout";

// props.gender 구조분해할당
const ExerciseRecommend = ({ gender, status: { age, height, weight } }) => {
  // pages/training/recommend에서 받아온 prop값인 gender : 정상적으로 받아오는 것 확인
  // 원랜 gender = props.gender, props.status처럼 받아와야 하지만 겍체 구조 분해 할당을 통해 위처럼 받아옴
  const [res, setRes] = useState({
    // 입력값 변수
    flag: 1,
    ...{ gender, age, height, weight },
    goalWeight: "",
    training: "",
  });
  const [data, setData] = useState(""); // chatGPT 응답값 변수

  useEffect(() => {
    setRes((prevState) => ({ ...prevState, gender: gender, age: age, height: height, weight: weight }));
  }, [gender, age, height, weight]); // 성별, 스테이터스가 props로 넘어올때마다(props.gender가 변동 있을때 마다)

  const onClickSubmitButton = () => {
    // 입력버튼 누르면
    axios.post("/api/chat", { prompt: res }).then((res) => {
      // prompt 변수에 res값을 담아서 포스트요청(api/chat.ts로)
      // console.log("응답 확인:",res.data);
      setData(res.data.response.text.replace(/^\n+/, "")); // chat.ts에서 응답받은 요청값을 data에 셋팅, 줄바꿈 제거
    });
  };

  const handleChange = (e) => {
    // input value값 핸들러
    const { name, value } = e.target; // 발생한 이벤트의 name값과 value값을 구조할당분해, 변수로 지정
    setRes((prevState) => ({ ...prevState, [name]: value })); // prevState 매개변수를 사용해 이전 res값을 복사하고, 새로운 값을 업데이트, 기존 값들을 유지하며 업데이트
    // name에 []대괄호 친 것은 parameter를 사용하기 위함. []빼면 프로퍼티
  };

  return (
    <CommonLayout>
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex">
          <div className="mr-2">
            <label className="flex items-center">
              <input type="radio" name="gender" value="남성" onChange={handleChange} checked={res.gender === "남성"} />
              <span className="ml-2">남성</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="radio" name="gender" value="여성" onChange={handleChange} checked={res.gender === "여성"} />
              <span className="ml-2">여성</span>
            </label>
          </div>
        </div>
        <div className="flex">
          <div className="mr-2">
            <label className="flex items-center">
              <input type="radio" name="training" value="Cardio" onChange={handleChange} />
              <span className="ml-2">유산소</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="radio" name="training" value="근력 운동" onChange={handleChange} />
              <span className="ml-2">무산소(웨이트)</span>
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2 bg-blue-400 rounded-lg py-2 px-4 ">
            나이
          </label>
          <input
            type="text"
            name="age"
            id="age"
            value={res.age || ""}
            // placeholder="나이"
            className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="height" className="block text-gray-700 font-bold mb-2 bg-blue-400 rounded-lg py-2 px-4 ">
            키(cm)
          </label>
          <input
            type="text"
            name="height"
            id="height"
            value={res.height || ""}
            // placeholder="키(cm)"
            className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="weight" className="block text-gray-700 font-bold mb-2 bg-blue-400 rounded-lg py-2 px-4 ">
            체중(kg)
          </label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={res.weight || ""}
            // placeholder="체중(kg)"
            className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="weight" className="block text-gray-700 font-bold mb-2 bg-blue-400 rounded-lg py-2 px-4 ">
            목표 체중(kg)
          </label>
          <input
            type="text"
            name="goalWeight"
            placeholder="목표 체중(kg)"
            className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          onClick={onClickSubmitButton}
        >
          입력
        </button>
      </div>
      <div className="flex w-3/5 min-h-[100px] mt-5 border-black border-2 whitespace-pre-line p-3 rounded-lg overflow-y-scroll">
        <label className="flex w-full h-full">{data && data}</label>
      </div>
      {/* {data & data} 3항연산자 왼쪽 값이 참이면 오른쪽 값 표시 */}
    </CommonLayout>
  );
};

export default ExerciseRecommend;
