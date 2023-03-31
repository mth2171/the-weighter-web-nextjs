import ExerciseScreen from "./exercise-screen";

const InsideBox = ({ type, setNowCount, nowCount, onClickStartButton, isReady, time, isFull, setIsFull }) => {
  return (
    <div className="flex w-2/3 h-4/5 shadow-shadow bg-white justify-center items-center rounded-xl">
      <ExerciseScreen type={type} setNowCount={setNowCount} isReady={isReady} time={time} isFull={isFull} setIsFull={setIsFull} />
      <div className="flex mt-[42%] w-1/3 h-[10%] justify-center items-center bg-button rounded-lg shadow-shadow text-white flex-row text-2xl mx-10 opacity-80">
        <label className="flex w-1/4 h-full justify-center items-center">총 개수 :</label>
        <label className="flex w-1/4 h-3/5 bg-black text-white justify-center items-center ml-3 rounded-lg">{nowCount}</label>
        <button
          className="flex w-1/3 h-full border-black border-l justify-center items-center ml-10"
          onClick={() => {
            console.log(isFull);
            setIsFull(!isFull);
          }}
        >
          전체화면
        </button>
      </div>
      <button
        className="flex mt-[42%] mx-10 w-[150px] h-[10%] justify-center items-center text-white rounded-lg bg-button text-2xl shadow-shadow"
        onClick={() => onClickStartButton()}
      >
        START
      </button>
    </div>
  );
};

export default InsideBox;
