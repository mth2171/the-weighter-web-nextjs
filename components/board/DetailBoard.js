import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

const DetailBoard = ({ data, comment, setComment }) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [nowHit, setNowHit] = useState(data.like);

  const onClickWriteComment = () => {
    if (content) {
      console.log(content, data.id);
      axios
        .post("comment/create", { content, board_id: data.id }, { withCredentials: true })
        .then((res) => setComment(res.data))
        .catch((err) => console.error(err));
    }
  };

  const onClickHitButton = () => {
    axios.post("http://localhost:8000/board/like", { id: data.id, like: data.like }, { withCredentials: true }).then((res) => setNowHit(res.data.like));
  };

  const onClickDeleteButton = () => {
    axios.post("delete", { id: data.id }, { withCredentials: true }).then((res) => {
      if (res.data === "SUCCESS") {
        router.back();
      } else {
        alert("실패했습니다.");
      }
    });
  };

  const onClickModifyButton = () => {
    router.push({ pathname: "/board/modify", query: { id: data.id } });
  };

  return (
    <div className="flex w-3/5 border-neutral-400 border-2 justify-center bg-white items-center flex-col my-10">
      <div className="flex w-full h-14 justify-between border-neutral-400 border-b-2 items-center">
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-r">제목</div>
        <div className="flex w-[90%] h-full px-5 items-center">{data.title}</div>
      </div>
      <div className="flex w-full h-14 justify-between border-neutral-400 border-b-2 items-center">
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-r">글번호</div>
        <div className="flex w-[5%] h-full items-center p-5 justify-center">{data.id}</div>
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-x">조회수</div>
        <div className="flex w-[5%] h-full items-center p-5 justify-center">{data.hit}</div>
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 border-x bg-neutral-300">카테고리</div>
        <div className="flex w-[10%] h-full items-center p-5 justify-center">
          {data.category === "default" ? "기본" : data.category === "community" ? "커뮤니티" : "QnA"}
        </div>
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-x">작성자</div>
        <div className="flex w-[15%] h-full items-center p-5 justify-center">{data.user_name}</div>
        <div className="flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-x">작성일</div>
        <div className="flex w-[15%] h-full items-center p-5 justify-center">{moment(data.createdAt).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex w-full min-h-[300px] justify-between border-neutral-400 border-b items-center">
        <div className="flex w-[10%] min-h-[300px] justify-center items-center border-neutral-400 border-r bg-neutral-300">내용</div>
        <div className="flex w-[90%] h-full p-5">{data.content}</div>
      </div>
      <div className="flex w-full min-h-[150px] justify-center items-center border-neutral-400 border-b flex-col">
        <div className="flex w-full h-12 justify-center items-center bg-neutral-300 border-neutral-400 border-b">댓글</div>
        {comment.length >= 1 &&
          comment.map((value) => {
            return (
              <div className="flex w-full h-14 justify-between border-neutral-400 border-b-2 items-center" key={value.id}>
                <div className="flex w-[10%] h-14 justify-center items-center border-neutral-400 border-r border-y bg-neutral-300">{value.user_name}</div>
                <div className="flex w-[90%] h-full px-5 items-center">{value.content}</div>
              </div>
            );
          })}
        <div className="flex w-full min-h-[100px] justify-between pl-5 p-2">
          <textarea className="flex w-[90%] border-neutral-400 border resize-none p-3 rounded-md" onChange={(e) => setContent(e.target.value)} />
          <div className="flex w-[10%] border-neutral-400 border-l ml-2 justify-center items-center">
            <button className="flex w-4/5 h-20 bg-button justify-center items-center text-white" onClick={() => onClickWriteComment()}>
              작성
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center flex-col p-3">
        <button className="flex w-24 h-24 justify-center items-center bg-button text-white flex-col rounded-full" onClick={() => onClickHitButton()}>
          <label className="cursor-pointer">{nowHit ? nowHit : data.like}</label>
          <label className="cursor-pointer">추천</label>
        </button>
        <div className="flex flex-row mt-2">
          <button className="flex w-24 h-14 justify-center items-center bg-red-500 text-white  rounded-lg" onClick={() => onClickDeleteButton()}>
            삭제
          </button>
          <button className="flex w-24 h-14 justify-center items-center bg-green-500 text-white ml-5 rounded-lg" onClick={() => onClickModifyButton()}>
            수정
          </button>
          <button className="flex w-24 h-14 justify-center items-center bg-neutral-500 text-white ml-5 rounded-lg" onClick={() => router.push("/board")}>
            목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBoard;
