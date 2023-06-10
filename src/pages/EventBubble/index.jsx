import React, { useEffect } from 'react'
import classes from './index.module.scss'

const EventBubble = () => {
  const onClickOuter = () => {
    console.log('Outer')
  }

  const onClickInner = () => {
    console.log('Inner')
  }

  useEffect(() => {
    const documentClick = () => {
      console.log('Document')
    }
    document.addEventListener('click', documentClick)
    return () => {
      document.removeEventListener('click', documentClick)
    }
  }, [])

  return (
    <>
      3 - Document
      <div className={classes.div1} onClick={onClickOuter}>
        2 - Outer
        <div className={classes.div2} onClick={onClickInner}>
          1 - Inner
        </div>
      </div>
    </>
  )
}

export default EventBubble
