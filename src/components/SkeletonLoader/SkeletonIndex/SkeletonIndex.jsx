import React from 'react'
import './SkeletonIndex.scss'
function SkeletonIndex() {
    return (
        <div className='skeleton-container'>
            <div className="detail-box-row">
                <div className="detail-box skeleton"></div>
                <div className="detail-box skeleton"></div>
                <div className="detail-box skeleton"></div>
                <div className="detail-box skeleton"></div>
            </div>
            <div className="Analytics-part">
                <div className="Analytics-Overview-Box skeleton"></div>
                <div className="satisfication-indicator skeleton"></div>
                <div className="browser-usage-stats skeleton"></div>
                <div className="orders-indicator-box skeleton"></div>
            </div>
            <div className="social-campaign-container">
                <div className="table skeleton"></div>
                <div className="Advertise-box skeleton"></div>
            </div>
        </div>
    )
}

export default SkeletonIndex;