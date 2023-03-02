import moment from "moment";
import { Pagination } from "@mui/material";

const BoardTable = ({ data, onClickTitle, count, handlePage }) => {
  return (
    <div className="flex w-2/3 h-4/5 justify-start items-center flex-col">
      <div className="flex w-full justify-center items-center border-neutral-400 border-y-2 text-black bg-white">
        <div className="flex w-[5%] h-12 justify-center items-center border-neutral-400 border-r">번호</div>
        <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">작성자</div>
        <div className="flex w-[50%] h-12 justify-center items-center border-neutral-400 border-r">제목</div>
        <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">카테고리</div>
        <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">조회수</div>
        <div className="flex w-[15%] h-12 justify-center items-center">작성일</div>
      </div>
      {data &&
        data.map((value) => {
          return (
            <div className="flex w-full justify-center items-center border-neutral-400 border-b-2 text-black bg-white" key={value.id}>
              <div className="flex w-[5%] h-12 justify-center items-center border-neutral-400 border-r">{value.id}</div>
              <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">{value.user_name}</div>
              <div className="flex w-[50%] h-12 justify-center items-center border-neutral-400 border-r cursor-pointer" onClick={() => onClickTitle(value.id)}>
                {value.title}
              </div>
              <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">
                {value.category === "default" ? "기본" : value.category === "community" ? "커뮤니티" : "qna"}
              </div>
              <div className="flex w-[10%] h-12 justify-center items-center border-neutral-400 border-r">{value.hit}</div>
              <div className="flex w-[15%] h-12 justify-center items-center">{moment(value.createdAt).format("YYYY-MM-DD")}</div>
            </div>
          );
        })}
      <div className="flex w-full h-14 justify-center items-center bg-white border-neutral-400 border-b-2">
        <Pagination count={parseInt(count / 10) + 1} defaultPage={1} boundaryCount={2} onChange={(e) => handlePage(e)} />
      </div>
    </div>
  );
};

export default BoardTable;
