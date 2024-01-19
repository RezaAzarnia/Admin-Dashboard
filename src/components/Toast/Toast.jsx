import React, { useEffect ,memo} from 'react'
import { IoCheckmark } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa6";

import './Toast.scss'
 function Toast({ mode, title, isShowToast, setIsShowToast }) {
    const closeToast = () => {
        setIsShowToast(false)
    }
    useEffect(() => {
        if (isShowToast) {
            const timer = setTimeout(closeToast, 3000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isShowToast])
    return (

        <div
            className={`toast ${mode}  ${isShowToast ? 'active' : 'diActive'}`}
            onClick={closeToast} >
            <span className='close'
                onClick={closeToast}>
                &times;
            </span>
            <div className="toast-content">
                {
                    mode === 'success' ? (
                        <IoCheckmark className='toast-icon check' />
                    ) : <FaExclamation className='toast-icon error' />
                }
                <div className="message">
                    <h4 className="text text-1">{mode}</h4>
                    <div className="text text-2">
                        {
                                //make array the message 
                                typeof title !== 'object' ? [title] : title.map((item, index) => {
                                    return <p key={index + 1}>{item}</p>
                                })
                        }
                    </div>
                </div>
            </div>
            <div className="progress">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}
export default memo(Toast)