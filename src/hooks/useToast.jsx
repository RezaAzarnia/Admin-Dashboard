import React, { useState } from 'react'
import Toast from '../Components/Toast/Toast'

export default function useToast() {
    const [isShowToast, setIsShowToast] = useState(false)
    const [toastItems, setToastItems] = useState({})

    const showToast = (mode, title) => {
        setIsShowToast(true)
        setToastItems({ mode, title })
    }
    const ToastComponent = () => {
        return (isShowToast && <Toast {...toastItems} isShowToast={isShowToast} setIsShowToast={setIsShowToast} />)
    }
    return { showToast, ToastComponent }
}
