import React, { useEffect } from 'react'
import classes from './index.module.scss'

const EventCapture = () => {
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
    document.addEventListener('click', documentClick, true)
    return () => {
      document.removeEventListener('click', documentClick, true)
    }
  }, [])

  return (
    <>
      1 - Document
      <div className={classes.div1} onClickCapture={onClickOuter}>
        2 - Outer
        <div className={classes.div2} onClickCapture={onClickInner}>
          3 - Inner
        </div>
      </div>
    </>
  )
}

export default EventCapture
