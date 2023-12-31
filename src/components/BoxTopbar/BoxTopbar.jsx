import React from 'react'
import "./BoxTopbar.scss"
export default function BoxTopbar({ title , children }) {
    return (
        <div className="box-topbar">
            <div className="title">
                <h3>{title}</h3>
            </div>
            <div className="topbar-right-side">
                {children}
            </div>
        </div>
    )
}
