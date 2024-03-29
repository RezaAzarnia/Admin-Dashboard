import React from 'react'
import { Form, Formik, } from 'formik';
import ReactDOM from 'react-dom';
import Button from '../../Form/Button/Button';
import './EditModal.scss'

export default function EditModal({ isOpen, setIsOpen, isLoading, title, children, initialValues, onSubmit }) {
  return ReactDOM.createPortal(
    <>
      <div className='overlay active' onClick={() => !isLoading && setIsOpen(false)}></div>
      <div className={`edit-modal modal ${isOpen ? 'active' : ''}`}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            {children}
            <div className="edit-modal-btn-row">
              <div className="edit-modal-buttons">
                <Button title='cancel' mode='error' type='button' onclick={() => !isLoading && setIsOpen(false)} />
                <Button
                  isLoading={isLoading}
                  title={title}
                  mode='success'
                  type='submit'
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
    ,
    document.querySelector('.modal-container')
  )

}
