import Link from "next/link";

const ButtonBar = () => {
  return (
    <div className="flex w-3/5 h-[10%] justify-end items-center mb-4 px-10">
      <Link href="board/create">
        <button className="flex w-32 h-14 justify-center items-center bg-button text-white rounded-lg">게시글 작성</button>
      </Link>
    </div>
  );
};

export default ButtonBar;
