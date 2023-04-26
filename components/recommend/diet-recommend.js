import axios from "axios";
import { useState, useEffect } from "react";
import CommonLayout from "../layout/CommonLayout";

const DietRecommend = ({ gender, status: { age, height, weight, disease, allergy } }) => {
  const [res, setRes] = useState({
    flag: 0,
    buttonInput: "",
    menus: "",
    gender,
    age,
    height,
    weight,
    disease,
    allergy,
  });

  useEffect(() => {
    setRes((prevState) => ({ ...prevState, gender, age, height, weight, disease, allergy }));
  }, [gender, age, height, weight, disease, allergy]); // 성별, 스테이터스가 props로 넘어올때마다(props.gender가 변동 있을때 마다)

  const [data, setData] = useState(""); // 식단 추천받은 값이 담김
  const [recipe, setRecipe] = useState(""); // 추천받은 식단의 레시피가 담김
  const onClickSubmitButton = (e) => {
    // 입력버튼 누르면
    // setRes(prevState => ({ ...prevState, buttonInput: e.target.id })); // 여기서 비동적 특성이 있는 useState 훅의 res.buttonInput에 값을 입력하므로, 아래 axios.post로 res값을 줄때 최신 상태를 반영하지 않을 수 있음
    const updatedRes = {
      ...res,
      buttonInput: e.target.id,
    };
    if (e.target.id === "button1") {
      axios
        .post("http://localhost:3000/api/chat", { prompt: updatedRes })
        .then((res) => {
          // prompt 변수에 res값을 담아서 포스트요청(api/chat.ts로) / then에서 응답 받은 값을(res)파라미터에 할당
          const responseStr = res.data.response.text.replace(/^\n+/, "");
          let menuList = responseStr
            .split(/\n+/) // 개행 문자열을 기준으로 문자열을 분리하여 배열 생성
            .filter((line) => line.includes("식단 : ")) // '식단 : '을 포함하는 요소들만 필터링
            .map((line) => line.split("식단 : ")[1]) // '식단 : ' 다음 문자열만 추출하여 새로운 배열 생성
            .flatMap((menu) => menu.split(", ")); // 각 요소들을 쉼표와 공백으로 분리하여 배열을 평탄화
          // console.log("menuList:",menuList);
          setRes((prevRes) => ({
            ...prevRes,
            menus: menuList.join(", "), // menuList의 모든 요소를 ,로 구분된 하나의 문자열로 합침
          }));
          setData(responseStr); // chat.ts에서 응답받은 요청값을 data에 셋팅
          console.log("식단추천 응답");
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (e.target.id === "button2") {
      axios
        .post("/api/chat", { prompt: updatedRes })
        .then((res) => {
          // prompt 변수에 res값을 담아서 포스트요청(api/chat.ts로) / then에서 응답 받은 값을(res)파라미터에 할당
          // console.log("전송값 확인:",res.config.data);
          console.log("레시피 응답");
          setRecipe(res.data.response.text.replace(/^\n+/, ""));
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
        <input
          type="text"
          name="age"
          value={res.age || ""}
          placeholder="나이"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          value={res.height || ""}
          placeholder="키(cm)"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="weight"
          value={res.weight || ""}
          placeholder="체중(kg)"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="activityRate"
          placeholder="활동량"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="disease"
          value={res.disease || ""}
          placeholder="질병, 질환"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="allergy"
          value={res.allergy || ""}
          placeholder="알러지"
          className="px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={handleChange}
        />
        <button
          id="button1"
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
      {data && (
        <div>
          <div>
            <button
              id="button2"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={onClickSubmitButton}
            >
              레시피 보기
            </button>
          </div>
          <div className="flex w-full min-h-[100px] mt-5 border-black border-2 whitespace-pre-line p-3 rounded-lg overflow-y-scroll">
            <label className="flex w-full h-full">{recipe && recipe}</label>
          </div>
        </div>
      )}
    </CommonLayout>
  );
};

export default DietRecommend;
