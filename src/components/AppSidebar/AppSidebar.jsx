import React, { useEffect, useState } from 'react';
import { FaMountainSun } from 'react-icons/fa6';
import { MdShoppingBasket, MdAssignment, MdPerson, MdList, MdSettings } from 'react-icons/md';
import { useSidebarContext } from '../../context/SidebarContext';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiCommentDetail } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import './AppSidebar.scss';
export default function AppSidebar() {
    const { state: { isOpenMainSidebar } } = useSidebarContext();
    return (
        <aside className={`main-sidebar ${isOpenMainSidebar ? 'open' : 'close'} `}>
            <div className="sidebar-section">
                {isOpenMainSidebar ? (
                    <h3 className="sidebar-section-header">Main</h3>
                ) : (
                    <HiDotsHorizontal className='sidebar-icon-header' />
                )}

                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/">
                            <FaMountainSun className="sidebar-icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ProductsList">
                            <MdShoppingBasket className="sidebar-icon" />
                            <span>Products List</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ArticlesList">
                            <MdAssignment className="sidebar-icon" />
                            <span>Articles List</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/addProduct">
                            <MdList className="sidebar-icon" />
                            <span>Add New Product</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/addArticle">
                            <MdList className="sidebar-icon" />
                            <span>Add New Article</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Actions Section */}
            <div className="sidebar-section">
                {isOpenMainSidebar ? (
                    <h3 className="sidebar-section-header">Actions</h3>
                ) : (
                    <HiDotsHorizontal className='sidebar-icon-header' />
                )}

                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageUsers">
                            <MdPerson className="sidebar-icon" />
                            <span>Manage Users</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageCategory">
                            <MdSettings className="sidebar-icon" />
                            <span>Manage Categories</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageProducts">
                            <MdShoppingBasket className="sidebar-icon" />
                            <span>Manage Products</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageArticles">
                            <MdAssignment className="sidebar-icon" />
                            <span>Manage Articles</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageComments">
                            <BiCommentDetail className="sidebar-icon" />
                            <span>Manage Comments</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink className='sidebar-link' to="/ManageOrders">
                            <MdShoppingBasket className="sidebar-icon" />
                            <span>Manage Orders</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Featured Section */}
            <div className="sidebar-section">
                {isOpenMainSidebar ? (
                    <h3 className="sidebar-section-header">Exit</h3>
                ) : (
                    <HiDotsHorizontal className='sidebar-icon-header' />
                )}

                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <a className='sidebar-link'>
                            <RxExit className="sidebar-icon" />
                            <span>Exit</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
