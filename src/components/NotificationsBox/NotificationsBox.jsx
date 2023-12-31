import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { TbMessageChatbot } from "react-icons/tb";
import { getNotfications, seeAllNotificatios, seeNotification } from '../../services/Axios/Requests/notification';
import Button from '../Form/Button/Button'
import './NotificationsBox.scss';

const NotificationsBox = forwardRef((props, ref) => {
    const { isOpen, setNotificationsLength } = props;
    const [notifications, setNotifications] = useState([])
    const [initialLoad, setInitialLoad] = useState(true)
    const [isUpdateNotifs, setIsUpdateNotifs] = useState(false)
    const [notifId, setNotifId] = useState(0)

    //get all notifs 
    const getNotifs = async () => {
        const response = await getNotfications();
        const unReadNotifs = response.filter(item => item.isRead === 0)
        setNotifications(unReadNotifs)
        setNotificationsLength(unReadNotifs.length)
    }
    //read one notif 
    const readNotifs = async () => {
        await seeNotification(notifId);
    };
    //read all notifs 
    const readAllNotifs = async () => {
        await seeAllNotificatios(notifications)
        setIsUpdateNotifs(true)
    }

   //use this model to don't request at first page loading 
    useEffect(() => {
        if (!initialLoad) {
            readNotifs();
        }
    }, [notifId]);

   //use effect to get notifs by change notif id and read all notifs 
    useEffect(() => {
        getNotifs();
    }, [notifId, isUpdateNotifs]);

    //change the initial load - can request after page load
    useEffect(() => {
        setInitialLoad(false);
    }, []);;


    return (
        <div className={`notification-dropdown ${isOpen ? 'active' : ''}`} ref={ref} >
            <div className="notification-header">
                <h4>notification</h4>
                <span onClick={readAllNotifs} className='clearBtn'>clear all</span>
            </div>
            <div className="notification-body">
                <ul className='nofication-list'>
                    {
                        notifications.length > 0 ?
                            notifications.map(notif => {
                                return <li key={notif.id} className='notification-list-item' >
                                    <div className="text-part">
                                        <div className="notif-icon">
                                            <TbMessageChatbot className='message-icon' />
                                        </div>
                                        <div className="notif-text">
                                            <p>{notif.notifTitle}</p>
                                        </div>
                                    </div>
                                    <div className="notif-time">
                                        <Button title='see' mode='success' onclick={() => {
                                            setNotifId(notif.id)
                                        }}
                                        />
                                    </div>
                                </li>
                            }) : <li className='notification-list-item'>there is no notification</li>

                    }
                </ul>
            </div>
        </div>
    )
})

export default NotificationsBox;