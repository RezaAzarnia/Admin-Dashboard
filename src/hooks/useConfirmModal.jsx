import React, { useState } from 'react'
import ConfirmModal from '../Components/Modals/ConfirmModal/ConfirmModal'


export default function useConfirmModal() {

    const [isShowDeleteModal, setIsShowDeletModal] = useState(false)
    const showConfirmModal = () => {
        setIsShowDeletModal(true)
    }
    const hideConfirmModal = () => {
        setIsShowDeletModal(false)
    }
    const ConfirmModalComponent = (action, confirmFunction , isLoading) => {
        return (
            isShowDeleteModal &&
            <ConfirmModal
            action={action} 
            isOpen={isShowDeleteModal}
            onConfirm={confirmFunction} 
            onCancel={hideConfirmModal} 
            isLoading={isLoading}
            />
        )
    }
    return { showConfirmModal, hideConfirmModal, ConfirmModalComponent }
}
