import React, { useState } from 'react'
import useFetchItem from '../../hooks/useFetchItem'
import AreaGraph from '../Charts/AreaGraph/AreaGraph';
import BoxTopbar from '../BoxTopbar/BoxTopbar';
import { Area } from 'recharts';
import { getWebSiteAnaltic } from '../../services/Axios/Requests/analyticsService';
import { FaArrowTrendUp } from "react-icons/fa6";
import './AnalyticsOverviewBox.scss'

export default function AnalyticsOverviewBox() {
    const [checkBox, setCheckBox] = useState(false);
    const { data: analtycData } = useFetchItem('WebSiteAnaltic', getWebSiteAnaltic)

    return (
        <div className="Analytics-Overview-Box">
            <BoxTopbar title={checkBox ? 'Website Traffic' : 'Profit Overview'}>
                <div className="switch-input">
                    <label className="switch">
                        <input type="checkbox" checked={checkBox} onChange={() => setCheckBox(prev => !prev)} />
                        <div className="slider"></div>
                    </label>
                </div>
            </BoxTopbar>
            <div className="chart">
                {
                    analtycData &&
                    <AreaGraph data={analtycData} xAxis='year' yAxis>
                        {
                            checkBox ?
                                <>
                                    <Area type="monotone" dataKey='visit' fill="var(--green)" stroke="var(--green)" />
                                    <Area type="monotone" dataKey='sale' fill="#3498db" stroke="#3498db" />
                                </>
                                :
                                <>
                                    <Area type="monotone" dataKey='revenue' fill="var(--warning)" stroke="var(--warning)" />
                                    <Area type="monotone" dataKey='profit' fill="var(--green)" stroke="var(--green)" />
                                </>
                        }
                    </AreaGraph>
                }
            </div>
            <div className="chart-reports">
                <div className="report">
                    <span className="report-title">weekly visit</span>
                    <span className="report-count">100</span>
                </div>
                <div className="report">
                    <span className="report-title">monthly visits</span>
                    <span className="report-count">400</span>
                </div>
                <div className="report">
                    <span className="report-title">trend</span>
                    <FaArrowTrendUp className='report-trend-icon' />
                </div>
            </div>
        </div >
    )
}
