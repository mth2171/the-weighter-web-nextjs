import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const CreateTable = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("default");
  const [content, setContent] = useState("");

  const onClickSubmitButton = () => {
    if (title && category && content) {
      axios
        .post("http://localhost:8000/board/create", { title, category, content }, { withCredentials: true })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    } else {
      alert("제목, 내용을 모두 입력해주세요.");
    }
  };

  return (
    <div className="flex w-3/5 h-4/5 border-neutral-400 border-2 justify-center bg-white items-center flex-col">
      <div className="flex w-full h-[10%] justify-between border-neutral-400 border-b-2 items-center">
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-r">제목</div>
        <input className="flex w-[90%] h-full px-5" onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className="flex w-full h-[10%] justify-between border-neutral-400 border-b-2 items-center">
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 border-r bg-neutral-300">카테고리</div>
        <div className="flex w-[90%] h-full justify-start items-center p-5">
          <input type="radio" value="default" checked={category === "default"} onChange={(e) => setCategory(e.target.value)} />
          <label className="flex ml-2 mr-5">기본</label>
          <input type="radio" value="qna" checked={category === "qna"} onChange={(e) => setCategory(e.target.value)} />
          <label className="flex ml-2 mr-5">QnA</label>
          <input type="radio" value="community" checked={category === "community"} onChange={(e) => setCategory(e.target.value)} />
          <label className="flex ml-2">커뮤니티</label>
        </div>
      </div>
      <div className="flex w-full h-[70%] justify-between border-neutral-400 border-b items-center">
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 border-r bg-neutral-300">내용</div>
        <textarea className="flex w-[90%] h-full p-5 resize-none" onChange={(e) => setContent(e.target.value)} value={content} />
      </div>
      <div className="flex w-full h-[10%] justify-start border-neutral-400 border-b items-center bg-neutral-300">
        <button className="flex w-24 h-12 justify-center items-center bg-button text-white rounded-lg ml-3" onClick={() => onClickSubmitButton()}>
          작성
        </button>
        <Link href="/board">
          <button className="flex w-24 h-12 justify-center items-center bg-neutral-500 text-white rounded-lg ml-10">취소</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateTable;
