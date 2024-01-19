import React, { memo, useEffect, useRef, useState } from 'react'
import { useSidebarContext } from '../../context/SidebarContext';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillGrid3X3GapFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import NotificationsBox from '../NotificationsBox/NotificationsBox';
import ProfileSettingMenu from '../ProfileSettingMenu/ProfileSettingMenu';
import IconMenu from '../IconMenu/IconMenu';
import { Link } from 'react-router-dom';
import './Navbar.scss'


function Navbar() {
    const [active, setAcive] = useState(false)
    const { dispatch: toggleSidebar } = useSidebarContext()

    const [isOpenProfieMenu, setIsOpenProfileMenu] = useState(false);
    const [isOpenNotificationBox, setIsOpenNotificationBox] = useState(false);
    const [isOpenIconMenu, setIsOpenIconMenu] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0)
    const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth < 1023);

    const profileMenuRef = useRef();
    const notificationBoxRef = useRef();
    const iconMenuBoxRef = useRef();

    const handleClickOutSide = (e) => {
        if (!isOpenProfieMenu && !profileMenuRef.current.contains(e.target) && !e.target.closest('.profile-image')) {
            setIsOpenProfileMenu(false);
        }
        if (!isOpenNotificationBox && !notificationBoxRef.current.contains(e.target) && !e.target.closest('.notification-icon-container')) {
            setIsOpenNotificationBox(false);
        }
        if (!isOpenIconMenu && !iconMenuBoxRef.current.contains(e.target) && !e.target.closest('.icon-menu-container')) {
            setIsOpenIconMenu(false);
        }

    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide);
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);
    const handleResize = () => {
        setIsWindowSmall(window.innerWidth < 1023)
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <>
            <div className='navbar-container'>
                <div className="navbar-row">
                    <div className="navbar-left-side">
                        {isWindowSmall && (
                            <BsThreeDotsVertical className='icon' onClick={() => setAcive(prev => !prev)} />
                        )}
                        <div className="logo-container">
                            <img src='/images/logo.png' className="logo-icon" />
                            <Link to='/'>
                                <h3 className="brand-text">dashboard</h3>
                            </Link>
                        </div>
                        <div className="sidebar-icon">
                            <RxHamburgerMenu className='icon' onClick={() => toggleSidebar({ type: 'TOGGLE_MAINSIDEBAR' })} />
                        </div>

                    </div>
                    <div className="navbar-search-part">
                        <input type="text" placeholder="search" className="search-input" />
                        <IoIosSearch className='search-icon icon' />
                    </div>

                </div>
            </div>
            <div className={`navbar-right-side ${active ? 'active' : ''}`}>
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
                    <img src='/images/profile.jpg' alt="profile-picture" />
                    <ProfileSettingMenu ref={profileMenuRef} isOpen={isOpenProfieMenu} />
                </div>
            </div>
        </>

    )
}
export default memo(Navbar)