import React, { useCallback, useEffect, useState } from 'react'

const WhyuseCallback = () => {
  const [count, setCount] = useState(0)

  const onClickWithUseCallBack = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const onClickWithoutUseCallBack = () => {}

  useEffect(() => {
    console.log('onClickWithUserCallBack')
  }, [onClickWithUseCallBack])

  useEffect(() => {
    console.log('onClickWithoutUseCallBack')
  }, [onClickWithoutUseCallBack])

  return (
    <section>
      <h1>{count}</h1>
      <button onClick={onClickWithUseCallBack}>increment</button>
    </section>
  )
}

export default WhyuseCallback
