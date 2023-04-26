// 식단추천 부모페이지
import { useState, useEffect } from "react";
import DietRecommend from "../../components/recommend/diet-recommend"; // 식단추천 레이아웃
import request from "../../utils/request";

const Diet = () => {
  const [profileData, setProfileData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    request
      .post("/profile")
      .then((res) => {
        setProfileData(res.data.profile);
        setStatusData(res.data.status);
      })
      .catch((err) => console.error(err));
  }, []);

  return <DietRecommend gender={profileData.gender ? "남성" : "여성"} status={statusData} />;
};

export default Diet;
