import React , {forwardRef} from 'react'
import { FaFlag } from "react-icons/fa6";
import './NotificationsBox.scss';

const NotificationsBox = forwardRef((props, ref) => {
    const { isOpen } = props;
    return (
        <div className={`notification-dropdown ${isOpen ? 'active' : ''}`} ref={ref}>
            <div className="notification-header">
                <h4>notification</h4>
                <a onClick={() => alert('ok')}>clear all</a>
            </div>
            <div className="notification-body">
                <ul className='nofication-list'>
                    <li className='notification-list-item'>
                        <div className="text-part">
                            <div className="notif-icon">
                                <FaFlag className='flag-icon' />
                            </div>
                            <div className="notif-text">
                                <p>notification title</p>
                                <span>notif body</span>
                            </div>
                        </div>
                        <div className="notif-time">
                            <span>2pm</span>
                        </div>
                    </li>
                    <li className="divider"></li>
                </ul>
            </div>
        </div>
    )
})

export default NotificationsBox;