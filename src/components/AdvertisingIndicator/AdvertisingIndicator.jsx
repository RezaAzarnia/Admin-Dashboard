import React from 'react'
import BarGraph from '../Charts/BarGraph/BarGraph';
import BoxTopbar from '../BoxTopbar/BoxTopbar';
import { Bar } from 'recharts';
import { IoRefreshSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import './AdvertisingIndicator.scss';

export default function AdvertisingIndicator() {
    const data = [
        { year: 2012, product: 'product 1', sale: 8000, visit: 4000, usage: 2300 },
        { year: 2013, product: 'product 2', sale: 8100, visit: 5000, usage: 4300 },
        { year: 2014, product: 'product 3', sale: 8500, visit: 6000, usage: 1300 },
        { year: 2015, product: 'product 4', sale: 8000, visit: 2000, usage: 300 },
        { year: 2016, product: 'product 5', sale: 9000, visit: 1000, usage: 3500 },
        { year: 2017, product: 'product 6', sale: 7000, visit: 9000, usage: 1500 },
        { year: 2018, product: 'product 7', sale: 6000, visit: 10000, usage: 5000 }
    ]
    return (
        <div className="Advertise-box">
            <BoxTopbar title='advertising & promotion'>
                <IoRefreshSharp className='icon' />
                <BsThreeDotsVertical className='icon' />
            </BoxTopbar>
            <div className="advertise-chart">
                <BarGraph data={data} yAxis xAxis='year'>
                    <Bar dataKey='sale' fill='var(--green)' stackId='a' />
                    <Bar dataKey='visit' fill='var(--warning)' stackId='a' />
                    <Bar dataKey='usage' fill='var(--primary)' stackId='a' />
                </BarGraph>
            </div>
            <div className="chart-info-row" >
                <span className='advertise-chart-info'>active</span>
                <span className='advertise-chart-info'>close</span>
                <span className='advertise-chart-info'>hold</span>
            </div>
        </div>
    )
}
