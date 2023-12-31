import React, { memo, useEffect, useRef, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillGrid3X3GapFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import ProfileSettingMenu from '../ProfileSettingMenu/ProfileSettingMenu';
import NotificationsBox from '../NotificationsBox/NotificationsBox';
import IconMenu from '../IconMenu/IconMenu';
import { useSidebarContext } from '../../context/SidebarContext';
import './Navbar.scss'


function Navbar() {
    const { dispatch: toggleSidebar } = useSidebarContext()

    const [isOpenProfieMenu, setIsOpenProfileMenu] = useState(false);
    const [isOpenNotificationBox, setIsOpenNotificationBox] = useState(false);
    const [isOpenIconMenu, setIsOpenIconMenu] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0)

    const profileMenuRef = useRef();
    const notificationBoxRef = useRef();
    const iconMenuBoxRef = useRef();

    const handleClickOutSide = (e) => {
        if (!profileMenuRef.current.contains(e.target) && !e.target.closest('.profile-image')) {
            setIsOpenProfileMenu(false);
        }
        if (!notificationBoxRef.current.contains(e.target) && !e.target.closest('.notification-icon-container')) {
            setIsOpenNotificationBox(false);
        }
        if (!iconMenuBoxRef.current.contains(e.target) && !e.target.closest('.icon-menu-container')) {
            setIsOpenIconMenu(false);
        }

    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide);
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left-side">
                <div className="logo-container">
                    <img src='/images/logo.png' className="logo-img" />
                    <h3 className="brand-text">dashboard</h3>
                </div>
                <div className="bars-icon">
                    <RxHamburgerMenu className='icon' onClick={() => toggleSidebar({ type: 'TOGGLE_MAINSIDEBAR' })} />
                </div>
            </div>
            <div className="input-group">
                <input type="text" placeholder="search" className="search-input" />
                <IoIosSearch className='search-icon icon' />
            </div>
            <div className="navbar-right-side">
                <div className="settings-icon" onClick={() => toggleSidebar({ type: 'TOOGLE_TASKSIDEBAR' })}>
                    <IoSettingsSharp className='icon icon-click' />
                </div>

                <div className="icon-menu-container">
                    <BsFillGrid3X3GapFill className='icon' onClick={() => setIsOpenIconMenu(prev => !prev)} />
                    <IconMenu isOpen={isOpenIconMenu} ref={iconMenuBoxRef} />
                </div>

                <div className="mega-menu-container">
                    <BsThreeDotsVertical className='icon' />
                </div>

                <div className="notification-icon-container">
                    <span className="notification-length">{notificationsLength}</span>
                    <FaBell className='icon' onClick={() => setIsOpenNotificationBox(prev => !prev)} />
                    <NotificationsBox setNotificationsLength={setNotificationsLength} isOpen={isOpenNotificationBox} ref={notificationBoxRef} />
                </div>

                <div className="profile-image" onClick={() => { setIsOpenProfileMenu(prev => !prev) }}>
                    <img src='/images/profile.png' alt="profile-picture" />
                    <ProfileSettingMenu ref={profileMenuRef} isOpen={isOpenProfieMenu} />
                </div>
            </div>
        </nav >
    )
}
export default memo(Navbar)