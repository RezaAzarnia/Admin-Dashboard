import React from 'react'
import "./DetailBox.scss";

export default function DetailBox({ symbol }) {
    return (
        <div className="detail-box">
            <div className="box-info">
                <h3 className="box-counter">914,001</h3>
                <span className="box-content">users</span>
            </div>
            <div className="symbol-side">
                {symbol}
            </div>
        </div>
    )
}
