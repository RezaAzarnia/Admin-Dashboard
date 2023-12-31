import React from 'react'
import PieGraph from '../Charts/PieGraph/PieGraph';
import AreaGraph from '../Charts/AreaGraph/AreaGraph';
import { Area } from 'recharts';
import { IoRefreshSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./TrafficIndicators.scss"
import BoxTopbar from '../BoxTopbar/BoxTopbar';

export default function TrafficIndicator() {
    const data = [
        { year: 2012, product: 'product 1', sale: 8000, visit: 4000, usage: 2300 },
        { year: 2013, product: 'product 2', sale: 8100, visit: 5000, usage: 4300 },
        { year: 2014, product: 'product 3', sale: 8500, visit: 6000, usage: 1300 },
    ]

    return (
        <div className="traffic-indicator-box">
            <BoxTopbar title='orders by category'>
                <IoRefreshSharp className='icon' />
                <BsThreeDotsVertical className='icon' />
            </BoxTopbar>
            
            <div className="circle-chart">
                <PieGraph data={data} dataKey='visit' />
            </div>
            <div className="visit-reports">
                <ul className='visit-reports-list'>
                    <li className='visit-reports-list-item'>

                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">
                            <AreaGraph data={data}>
                                <Area dataKey='usage' fill='var(--green)' stroke='var(--green)' />
                            </AreaGraph>
                        </div>
                    </li>
                    <li className='visit-reports-list-item'>
                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">
                            <AreaGraph data={data}>
                                <Area dataKey='sale' fill='var(--green)' stroke='var(--green)' />
                            </AreaGraph>
                        </div>
                    </li>
                    <li className='visit-reports-list-item'>
                        <div className="report-info">
                            <h5 className='report-info-title'>44.6% visit name</h5>
                            <span className='report-info-counts'>counter</span>
                        </div>
                        <div className="report-info-chart">
                            <AreaGraph data={data}>
                                <Area dataKey='year' fill='var(--green)' stroke='var(--green)' />
                            </AreaGraph>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
