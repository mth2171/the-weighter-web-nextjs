import CommonLayout from "../../components/layout/CommonLayout";
import { useEffect, useState } from "react";
import MotionResult from "../../components/modal/motionResult";
import { useRouter } from "next/router";
import axios from "axios";
import CountScreen from "../../components/motion/count-screen";
import InsideBox from "../../components/motion/inside-box";

const _TIME = 5;

const Motion = () => {
  const router = useRouter();
  const { type } = router.query;

  const [nowCount, setNowCount] = useState(0);

  const [time, setTime] = useState(_TIME);
  const [isStart, setIsStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [ready, setReady] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickStartButton = () => {
    setIsReady(true);
  };

  const onClickResetButton = () => {
    setIsStart(false);
    setTime(_TIME);
    setOpen(false);
    setIsFinished(false);
    setReady(5);
  };

  const onClickSaveButton = () => {
    if (window.confirm(`저장하시겠습니까? \n운동명 : ${type}, 시간 : ${_TIME}, 개수 : ${nowCount}, 점수 : ${nowCount}`)) {
      axios
        .post("motion/save", { type: type, count: nowCount, time: _TIME, score: nowCount }, { withCredentials: true })
        .then((res) => onClickResetButton())
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (isReady && ready !== 0) {
      const timer = setInterval(() => {
        setReady(ready - 1);
        clearInterval(timer);
      }, 1000);
    } else if (ready === 0) {
      setIsStart(true);
      setIsReady(false);
    }
  }, [isReady, ready]);

  return (
    <CommonLayout>
      {isReady && <CountScreen ready={ready} />}
      <InsideBox type={type} setNowCount={setNowCount} nowCount={nowCount} onClickStartButton={onClickStartButton} isReady={isReady} time={time} />
      <MotionResult
        open={open}
        onClose={() => setOpen(true)}
        // nowCount={nowCount}
        _TIME={_TIME}
        onClickResetButton={() => onClickResetButton()}
        onClickSaveButton={() => onClickSaveButton()}
        type={type}
      />
    </CommonLayout>
  );
};

export default Motion;
