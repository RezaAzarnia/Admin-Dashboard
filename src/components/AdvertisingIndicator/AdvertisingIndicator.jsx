import React from 'react'
import BarGraph from '../Charts/BarGraph/BarGraph';
import BoxTopbar from '../BoxTopbar/BoxTopbar';
import { Bar } from 'recharts';
import { IoRefreshSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import useFetchItem from '../../hooks/useFetchItem'
import { getWebSiteAnaltic } from '../../services/Axios/Requests/analyticsService';
import './AdvertisingIndicator.scss';

export default function AdvertisingIndicator() {
    const { data: analtycData } = useFetchItem('WebSiteAnaltic', getWebSiteAnaltic)
    return (
        <div className="Advertise-box">
            <BoxTopbar title='advertising & promotion'>
                <IoRefreshSharp className='icon' />
                <BsThreeDotsVertical className='icon' />
            </BoxTopbar>
            <div className="advertise-chart">
                {analtycData &&
                    <BarGraph data={analtycData} yAxis xAxis='year'>
                        <Bar dataKey='sale' fill='var(--green)' stackId='a' />
                        <Bar dataKey='revenue' fill='var(--warning)' stackId='a' />
                        <Bar dataKey='profit' fill='var(--primary)' stackId='a' />
                    </BarGraph>
                }
            </div>
            <div className="chart-info-row" >
                <span className='advertise-chart-info'>sale</span>
                <span className='advertise-chart-info'>revenue</span>
                <span className='advertise-chart-info'>profit</span>
            </div>
        </div>
    )
}
