import React, { memo, useCallback } from 'react'
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
      disabled={disabled}
      style={isLoading ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
    >
      {
        isLoading ? ("Loading...") : title
      }
    </button>
  )
}
export default memo(Button)