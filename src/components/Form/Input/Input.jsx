import React from 'react'
import { Field } from 'formik';
import './Input.scss'

export default function Input({ lableTitle, type, placeholder, children, name }) {
    return (
        <>
            <div className="input-group" >
                <label htmlFor="">
                    {lableTitle}
                </label>
                {
                    type === "select" ? (
                        <Field name={name} as='select'>
                            {children}
                        </Field>
                    ) :
                        type === 'textarea' ? (<Field as='textarea' placeholder={placeholder} name={name} ></Field>
                        ) : (
                            <Field
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                className='input'
                                autoComplete='off'
                            />
                        )
                }
            </div>

        </>
    )
}
