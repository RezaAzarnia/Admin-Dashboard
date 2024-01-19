import React from 'react'
import "./BoxTopbar.scss"
export default function BoxTopbar({ title , children }) {
    return (
        <div className="box-topbar">
            <div className="title">
                <h4>{title}</h4>
            </div>
            <div className="topbar-right-side">
                {children}
            </div>
        </div>
    )
}
