import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

const useForm = () => {
  const inputRefs = useRef({});

  const register = (key) => {
    const ref = (el) => {
      inputRefs.current[key] = el;
    };

    return { ref };
  };

  const handleSubmit = (cb) => {
    const body = {};
    Object.keys(inputRefs.current).forEach((el) => {
      body[el] = inputRefs.current[el].value;
    });
    cb(body);
  };

  return { register, handleSubmit };
};

const RightSide = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register, handleSubmit } = useForm();

  const onClickSubmitButton = () => {
    axios
      .post("http://localhost:8000/login/post", { id: email, pw: password }, { withCredentials: true })
      .then((res) => localStorage.setItem("token", res.data.token))
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex w-[45%] h-[90%] bg-neutral-200 rounded-r-xl justify-center items-center flex-col">
      <label className="flex text-4xl font-bold mb-10">로그인</label>
      <input
        className="flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3"
        placeholder="이메일"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3"
        placeholder="비밀번호"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex w-4/5 items-end flex-col">
        <button
          className="flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md"
          onClick={() => handleSubmit(onClickSubmitButton)}
        >
          로그인
        </button>
        <label className="flex text-neutral-400 mt-2">
          계정이 존재하지 않나요?
          <Link href="./signup">
            <label className="flex text-button ml-2 cursor-pointer">계정 만들기</label>
          </Link>
        </label>
        <label className="flex text-button mt-2">비밀번호를 잊으셨나요?</label>
      </div>
    </div>
  );
};

export default RightSide;
