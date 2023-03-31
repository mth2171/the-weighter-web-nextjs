import CommonLayout from "../components/layout/CommonLayout";
import Banner from "../components/main/banner";

export default function Home() {
  return (
    <CommonLayout>
      <Banner />
      <button onClick={() => console.log(localStorage.getItem("token"))}>버튼</button>
    </CommonLayout>
  );
}
