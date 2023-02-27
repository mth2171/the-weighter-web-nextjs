import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import DetailBoard from "../../components/board/DetailBoard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    if (id) {
      axios
        .get("/board/show", { withCredentials: true, params: { id } })
        .then((res) => {
          setData(res.data.data);
          setComment(res.data.comment);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);
  return (
    <div className="overflow-y-auto">
      <Header />
      <div className="flex w-full bg-neutral-200 min-h-[88vh] justify-center items-center">
        <DetailBoard data={data} comment={comment} />
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
