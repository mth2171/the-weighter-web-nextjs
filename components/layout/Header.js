import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import title from "../../public/title.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const _EXERCISES = ['SQUAT', 'PUSHUP', 'SITUP']

const Header = () => {
  return (
    <div className="flex w-full h-[7vh] justify-between items-center border-b-2 border-gray-300 bg-white">
      <Link href="/">
        <Image src={title} className="flex h-[6vh] w-[12vw] ml-7 cursor-pointer" alt="logo"/>
      </Link>
      <div className="flex justify-center items-center mr-7 text-black">
        <Link href="/info">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold">기능 소개</button>
        </Link>
        <Link href="/barcode">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold">BARCODE</button>
        </Link>
        <Menu as="div" className="relative inline-block border-menuitem border-b-2 mr-7">
          <div>
            <Menu.Button className="flex w-36 h-[4vh] justify-center items-center text-base font-semibold">
              모션인식
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transfrom opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right">
              <div className="py-1">
                <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
                  {({ active }) => (
                    <Link href={{
                      pathname: "/motion",
                      query: { type: 'squat' }
                    }} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2')}>{_EXERCISES[0]}</Link>
                  )}
                </Menu.Item>
                <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
                  {({ active }) => (
                    <Link href={{
                      pathname: "/motion",
                      query: { type: 'pushup' }
                    }} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2')}>{_EXERCISES[1]}</Link>
                  )}
                </Menu.Item>
                <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
                  {({ active }) => (
                    <Link href={{
                      pathname: "/motion",
                      query: { type: 'situp' }
                    }} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2')}>{_EXERCISES[2]}</Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Link href="/qna">
          <button className="flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold">고객 지원</button>
        </Link>
        <Link href="/login">
          <button className="flex w-40 h-[4vh] justify-center items-center border-2 border-black mr-5 text-menu text-base font-semibold">로그인</button>
        </Link>
        <Link href="/signup">
          <button className="flex w-40 h-[4vh] justify-center items-center border-2 border-black text-menu text-base font-semibold">회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;