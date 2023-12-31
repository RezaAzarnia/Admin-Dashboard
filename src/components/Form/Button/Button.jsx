import React from 'react'
import './Button.scss'
export default function Button({  title, mode, onclick, type }) {
  return (
    <>
      <button className={`button ${mode}`} onClick={onclick} type={type}>
        {title}
      </button >
    </>
  )
}
