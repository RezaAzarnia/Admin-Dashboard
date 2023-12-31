import React, { useState } from 'react'
import AreaGraph from '../Charts/AreaGraph/AreaGraph';
import { Area } from 'recharts';
import BoxTopbar from '../BoxTopbar/BoxTopbar';
import './UserStaticBox.scss'


export default function UserStaticBox() {
    const [checkBox, setCheckBox] = useState(false);
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
        <div className="users-status-chart">
            <BoxTopbar title='user stattic'>
                <div className="switch-input">
                    <label className="switch">
                        <input type="checkbox" checked={checkBox} onChange={() => setCheckBox(prev => !prev)} />
                        <div className="slider"></div>
                    </label>
                </div>
            </BoxTopbar>
            <div className="chart">
                <AreaGraph data={data} xAxis='year' yAxis>
                    <Area type="monotone" dataKey='sale' fill="var(--warning)" stroke="var(--warning)" />
                    <Area type="monotone" dataKey='visit' fill="var(--green)" stroke="var(--green)" />
                    <Area type="monotone" dataKey='usage' fill='var(--primary)' stroke='var(--primary)' />
                </AreaGraph>
            </div>
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
