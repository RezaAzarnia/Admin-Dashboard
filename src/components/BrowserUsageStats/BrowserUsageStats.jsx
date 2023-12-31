import React from 'react'
import BoxTopbar from '../BoxTopbar/BoxTopbar'
import { MdFileDownload } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import './BrowserUsageStats.scss'

export default function BrowserUsageStats() {
    return (
        <div className="browser-usage-stats">
            <BoxTopbar title='bowser stats'>
                <MdFileDownload className='icon' />
                <IoCloseOutline className='icon' />
            </BoxTopbar>
            <div className="browsers-stats">
                <ul className='browsers-list'>
                    <li className='browser-list-item'>
                        chrome
                        <span className="badge bg-success">50%</span>
                    </li>
                    <li className='browser-list-item'>
                        FireFox Mozilla
                        <span className="badge bg-warning">25%</span>
                    </li>
                    <li className='browser-list-item'>
                        Opera
                        <span className="badge bg-danger">20%</span>
                    </li>
                    <li className='browser-list-item'>
                        Edge
                        <span className="badge bg-danger">5%</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
