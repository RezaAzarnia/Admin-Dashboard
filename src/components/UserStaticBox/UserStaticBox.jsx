import React, { useState } from 'react'
import './UserStaticBox.scss'
export default function UserStaticBox() {
    const [checkBox, setCheckBox] = useState(false);
    return (
        <div className="users-status-chart">
            <div className="chart-heder">
                <div className="chart-name">user stattic</div>
                <div className="switch-input">
                    <label className="switch">
                        <input type="checkbox" checked={checkBox} onChange={() => setCheckBox(prev => !prev)} />
                        <div className="slider"></div>
                    </label>
                </div>
            </div>
            <div className="chart"></div>
            <div className="chart-reports">
                <div className="report">
                    <h3 className="report-title">weekly users</h3>
                    <span className="report-count">300000</span>
                </div>
                <div className="report">
                    <h3 className="report-title">monthly users</h3>
                    <span className="report-count">900000</span>
                </div>
                <div className="report">
                    <h3 className="report-title">trend</h3>
                    <span className="report-count"><i className="fa fa-trend"></i></span>
                </div>
            </div>
        </div >
    )
}
