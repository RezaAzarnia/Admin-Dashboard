import React, { useEffect, useRef, useState } from 'react'
import { IoCheckmark } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa6";

import './Toast.scss'
export default function Toast({ mode, title, isShowToast, setIsShowToast }) {
    const toastRef = useRef()
    useEffect(() => {
        if (isShowToast) {
            const timer = setTimeout(() => {
                setIsShowToast(false)
            }, 4000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isShowToast])
    return (
        <div className={`toast ${mode === 'success' ? 'success' : 'error'} ${isShowToast ? 'active' : 'diActive'}`} ref={toastRef} >
            <span className='close'>&times;</span>
            <div className="toast-content">
                {
                    mode === 'success' ? (
                        <IoCheckmark className='toast-icon check' />
                    ) : <FaExclamation className='toast-icon error' />
                }
                <div className="message">
                    <h4 className="text text-1">{mode}</h4>
                    <div className="text text-2">{title}</div>
                </div>
            </div>
            <div className="progress">
                <div className="progress-bar"></div>
            </div>
        </div>
    )
}
