import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import Button from '../../Form/Button/Button';
import './Modal.scss'
export default function Modal({ isOpen, setIsOpen, children, title }) {


    return ReactDOM.createPortal(
        <>
            <div className='overlay active' onClick={() => setIsOpen(false)}></div>
            <div className={`simple-modal modal ${isOpen ? 'active' : ''}`}>
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                {children}
                <Button title='close' mode='error' onclick={() => setIsOpen(false)} />
            </div>
        </>
        ,
        document.querySelector('.modal-container')
    )
}
