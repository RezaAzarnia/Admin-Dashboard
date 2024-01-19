import React, { memo, useCallback } from 'react'
import { RiLoader2Line } from "react-icons/ri";
import './Button.scss'

function Button({ title, mode, isLoading, onclick, type, disabled }) {

  const handleClick = useCallback(() => {
    if (typeof onclick === 'function') {
      onclick();
    }
  }, [onclick]);
  return (
    <button
      className={`button ${mode}`}
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {
        isLoading ? (
          <span className='button-spinner-loader'>
            <RiLoader2Line className='spinner-icon' />
            loading
          </span>
        ) : title
      }
    </button>
  )
}
export default memo(Button)