import React, { forwardRef } from 'react'
import './ProfileSettingMenu.scss'
const ProfileSettingMenu = forwardRef((props, ref) => {
    const { isOpen } = props;
    return (
        <div className={`profile-setting-dropdown ${isOpen ? "active" : ''}`} ref={ref}>
            <ul className='profile-setting-list'>
                    <li className="setting-list-item">
                        profile
                    </li>
                <li className="setting-list-item">
                    my balance
                </li>
                <li className="setting-list-item">
                    inbox
                </li>
                <li className="setting-list-item">
                    setting
                </li>
                <li className="divider"></li>
                <li className="setting-list-item activate-item">
                    available
                </li>
                <li className="divider"></li>
                <li className="setting-list-item activate-item">
                    log out
                </li>

            </ul>
        </div>
    )
})
export default ProfileSettingMenu;