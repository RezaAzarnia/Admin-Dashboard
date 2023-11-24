import React, { forwardRef } from 'react';
import { TiWeatherCloudy } from "react-icons/ti";
import { IoMdMailOpen } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdMap } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

import './IconMenu.scss'
const IconMenu = forwardRef((props, ref) => {
    const { isOpen } = props;
    return (
        <div className={`icon-menu ${isOpen ? 'active' : ''}`} ref={ref}>
            <ul className='icon-menu-list'>
                <li className="icon-menu-list-item">
                    <TiWeatherCloudy className='list-icon' />
                    <span className='icon-title'>weathers</span>
                </li>
                <li className="icon-menu-list-item">
                    <IoMdMailOpen className='list-icon' />
                    <span className='icon-title'>mail</span>
                </li>
                <li className="icon-menu-list-item">
                    <FaRegCalendarCheck className='list-icon' />
                    <span className='icon-title'>calendare</span>
                </li>
                <li className="icon-menu-list-item">
                    <MdMap className='list-icon' />
                    <span className='icon-title'>map</span>
                </li>
                <li className="icon-menu-list-item">
                    <FiMessageSquare className='list-icon' />
                    <span className='icon-title'>chart</span>
                </li>
                <li className="icon-menu-list-item">
                    < MdPermContactCalendar className='list-icon' />
                    <span className='icon-title'>contact</span>
                </li>
                <li className="deivder"></li>
                <li className="read-more">
                    <a href="">more</a>
                </li>
            </ul>
        </div>
    )
})

export default IconMenu;