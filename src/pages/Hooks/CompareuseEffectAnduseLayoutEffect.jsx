import React, { useEffect, useLayoutEffect, useState } from 'react'

const CompareuseEffectAnduseLayoutEffect = () => {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    // this effect runs before DOM paints updated values
    // this will take a sometime to complete,
    // So when a user clicks increment after sometime new value will get render.
    // So we should avoid time taking code inside useLayoutEffect
    let i = 0
    while (i <= 1000000000) i++
    console.log('useLayoutEffect')
  })

  useEffect(() => {
    // this effect runs after DOM paints updated values
    console.log('useEffect')
  })

  return (
    <div>
      {count}
      <button onClick={() => setCount(prev => prev + 1)}>increment</button>
    </div>
  )
}

export default CompareuseEffectAnduseLayoutEffect
