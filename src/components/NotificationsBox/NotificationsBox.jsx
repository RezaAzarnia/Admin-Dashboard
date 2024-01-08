import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { TbMessageChatbot } from "react-icons/tb";
import { getNotfications, seeAllNotificatios, seeNotification } from '../../services/Axios/Requests/notification';
import Button from '../Form/Button/Button'
import './NotificationsBox.scss';
import useFetchItem from '../../hooks/useFetchItem'
import useItemMutation from '../../hooks/useItemMutation';

const NotificationsBox = forwardRef((props, ref) => {
    const { data: notifs } = useFetchItem('Notification', getNotfications);
    const { isOpen, setNotificationsLength } = props;
    const [initialLoad, setInitialLoad] = useState(true)
    const [notifId, setNotifId] = useState(0)

    useEffect(() => {
        setNotificationsLength(notifs?.length)
    }, [notifs])

    //use this model to don't request at first page loading 
    useEffect(() => {
        if (!initialLoad) {
            readNotifs();
        }
    }, [notifId]);

    //change the initial load - can request after page load
    useEffect(() => {
        setInitialLoad(false);
    }, []);


    //read one notif 
    const { mutate: readNotifs } = useItemMutation(async () => {
        return await seeNotification(notifId)
    }, 'Notification')

    //read all notifs 
    const { mutate: readAllNotifs } = useItemMutation(async () => {
        return await seeAllNotificatios(notifs)
    }, 'Notification')




    return (
        <div className={`notification-dropdown ${isOpen ? 'active' : ''}`} ref={ref} >
            <div className="notification-header">
                <h4>notification</h4>
                <span onClick={readAllNotifs} className='clearBtn'>clear all</span>
                {/* {isLoading ? <span>loading</span> : ''} */}
            </div>
            <div className="notification-body">
                <ul className='nofication-list'>
                    {
                        notifs?.length > 0 ?
                            notifs?.map(notif => {
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
                                        <Button title='see' mode='success' onclick={() => setNotifId(notif.id)}
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