import React from 'react'
import { FaMountainSun } from "react-icons/fa6";
import { MdShoppingBasket } from "react-icons/md";
import "./Sidebar.scss";

export default function Sidebar() {
    return (
        <aside className="main-sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-section-header">main</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item active">
                        <FaMountainSun className='sidebar-icon'/>
                        <span>dashboard</span>
                    </li>
                    <li className="sidebar-item">
                        <MdShoppingBasket className='sidebar-icon'/>
                        <span>e-commerce</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps </span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                </ul>
            </div>
            <div className="sidebar-section">
                <h3 className="sidebar-section-header">component</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item active">
                        <i className="fa fa-mountain sidebar-icon"></i>
                        <span> dashboard</span>
                    </li>
                    <li className="sidebar-item">
                        <span>e-commerce</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                </ul>
            </div>
            <div className="sidebar-section">
                <h3 className="sidebar-section-header">featured</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item active">
                        <span>dashboard</span>
                    </li>
                    <li className="sidebar-item">
                        <span>e-commerce</span>
                    </li>
                    <li className="sidebar-item">
                        <span>Apps</span>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
