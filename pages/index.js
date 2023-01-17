import CommonLayout from "../components/layout/CommonLayout";

export default function Home() {
  return (
    <CommonLayout>
      <div className="flex w-full h-[88vh] items-center border-b-1 flex-col bg-white">
        <div className="flex w-full h-[35%] bg-banner justify-center items-center text-[30px] text-white">일상에서 찾아가는 건강</div>
      </div>
    </CommonLayout>
  );
}
