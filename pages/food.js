import CommonLayout from "../components/layout/CommonLayout";
import LeftSide from "../components/food/left-side";
import RightSide from "../components/food/right-side";
import Background from "../components/food/background";

const Food = () => {
  return (
    <CommonLayout>
      <Background>
        <LeftSide />
      </Background>
    </CommonLayout>
  );
};

export default Food;
