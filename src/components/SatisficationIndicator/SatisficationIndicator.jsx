import React from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import './SatisficationIndicator.scss'

export default function SatisficationIndicator() {
    return (
        <div className="satisfication-indicator">
            <h4 className="box-title">customer satisfaction</h4>
            <span className="satisfaction-rate">93.23%</span>
            <div className="satisfaction-progressbar"></div>
            <div className="satisfaction-reports">
                <div className="report">
                    <span className="report-title">previous</span>
                    <span className="count">79.82</span>
                </div>
                <div className="report">
                    <span className="report-title">Change</span>
                    <span className="count">+14.29</span>
                </div>
                <div className="report">
                    <span className="report-title">trend</span>
                    <span ><FaArrowTrendUp className="satisfication-trend-icon" /></span>
                </div>
            </div>
        </div>
    )
}
