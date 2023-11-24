import React from 'react'
import "./TrafficIndicators.scss"
export default function TrafficIndicator() {
    return (
        <div className="traffic-indicator-box">
            <div className="traffic-box-header">
                <h3>visit by traffic types</h3>
                <div className="download-side">
                    <i className="fa fa-reload" aria-hidden="true"></i>
                    <i className="fa fa-close"></i>
                </div>
            </div>
            <div className="circle-chart"></div>
            <div className="visit-reports">
                <ul className='visit-reports-list'>
                    <li className='visit-reports-list-item'>

                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">chart</div>
                    </li>
                    <li className='visit-reports-list-item'>
                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">chart</div>
                    </li>
                    <li className='visit-reports-list-item'>
                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">chart</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
