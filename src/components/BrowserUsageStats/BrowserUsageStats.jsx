import React from 'react'
import './BrowserUsageStats.scss'
export default function BrowserUsageStats() {
    return (
        <div className="browser-usage-stats">
            <div className="stats-header">
                <h3>Broswer Stats</h3>
                <div className="download-side">
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    <i className="fa fa-close"></i>
                </div>
            </div>
            <div className="browsers-stats">
                <ul className='browsers-list'>
                    <li className='browser-list-item'>
                        chrome
                        <span className="browser-usage-pill-badget">10%</span>
                    </li>
                    <li className='browser-list-item'>
                        chrome
                        <span className="browser-usage-pill-badget">10%</span>
                    </li>
                    <li className='browser-list-item'>
                        chrome
                        <span className="browser-usage-pill-badget">10%</span>
                    </li>
                    <li className='browser-list-item'>
                        chrome
                        <span className="browser-usage-pill-badget">10%</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
