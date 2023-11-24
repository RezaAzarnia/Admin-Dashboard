import React from 'react'
import './Table.scss'
export default function Table({ children }) {
    return (
        <table className='table'>
            {children}
        </table>
    )
}
