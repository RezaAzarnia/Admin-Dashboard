import React from 'react'
import ReactDOM from 'react-dom';
import { BiSolidError } from "react-icons/bi";
import Button from '../../Form/Button/Button';
import './ConfirmModal.scss'


export default function ConfirmModal({ action, isOpen, onCancel, onConfirm }) {
    let title, message, confirmLabel;
    switch (action) {
        case 'delete':
            title = 'Delete Item?';
            message = 'Are you sure you want to delete this item? This action cannot be undone.';
            confirmLabel = 'Delete';
            break;
        case 'accept':
            title = 'Accept Request?';
            message = 'Are you sure you want to accept this request?';
            confirmLabel = 'Accept';
            break;
        case 'reject':
            title = 'Reject Request?';
            message = 'Are you sure you want to reject this request?';
            confirmLabel = 'Reject';
            break;
        default:
            title = '';
            message = '';
            confirmLabel = '';
    }
    return ReactDOM.createPortal(
        <>
            <div className='overlay active' onClick={() => onCancel()}></div>
            <div className={`modal confirm-modal ${isOpen ? 'active' : ''}`}>
                <div className={`modal-header ${action}`}>
                    <BiSolidError />
                    <h2>{title}</h2>
                </div>
                <div className="modal-text">
                    <span className='modal-description'>
                        {message}
                    </span>
                </div>
                <div className="confirm-modal-button">
                    <Button title='cancel' onclick={() => onCancel()} />
                    <Button title={confirmLabel} mode={`${action === 'accept' ? 'success' : 'error'} `} onclick={onConfirm} />
                </div>
            </div>
        </>
        ,
        document.querySelector('.modal-container')
    )

}
