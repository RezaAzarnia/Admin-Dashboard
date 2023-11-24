import React from 'react'
import './AdvertisingIndicator.scss'
export default function AdvertisingIndicator() {
    return (
        <div className="Advertise-box">
            <div className="row">
                <h4>Advertising & Promotions</h4>
            </div>
            <div className="advertise-chart"></div>
            <div className="chart-info-row" >
                <span className='advertise-chart-info'>active</span>
                <span className='advertise-chart-info'>close</span>
                <span className='advertise-chart-info'>hold</span>
            </div>
        </div>
    )
}
