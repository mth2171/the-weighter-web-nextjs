import Image from "next/image";
import Link from "next/link";
import title from "../public/title.png";

const Header = () => {
  return (
    <div className="flex w-full h-[7vh] justify-between items-center border-b-2 border-gray-300 bg-white">
      <Link href="/">
        <Image src={title} className="flex h-[6vh] w-[12vw] ml-7 cursor-pointer" />
      </Link>
      <div className="flex justify-center items-center mr-7 text-black">
        <Link href="/info">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-[15px] font-[550]">기능 소개</button>
        </Link>
        <Link href="/barcode">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-[15px] font-[550]">BARCODE</button>
        </Link>
        <Link href="/motion">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-[15px] font-[550]">모션인식</button>
        </Link>
        <Link href="/qna">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-[15px] font-[550]">고객 지원</button>
        </Link>
        <Link href="/login">
          <button className="flex w-40 h-[4vh] justify-center items-center border-2 border-black mr-5 text-menu font-menu">로그인</button>
        </Link>
        <Link href="/signup">
          <button className="flex w-40 h-[4vh] justify-center items-center border-2 border-black text-menu font-menu">회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
