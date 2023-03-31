const Background = ({ children }) => {
  return (
    <>
      <div className='mb-10 text-3xl font-bold'>식단 분석</div>
      <div className='flex w-4/5 h-[80%] bg-white rounded-2xl items-center justify-center shadow-shadow'>{children}</div>
    </>
  )
}

export default Background
