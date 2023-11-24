import React, { useEffect } from 'react'
import { useSidebarContext } from '../../context/SidebarContext';
import './TaskSidebar.scss';

function TaskSidebar() {
    const { state: { isOpenTaskSidebar }, dispatch } = useSidebarContext()

    const handleClickOutside = (event) => {
        if (isOpenTaskSidebar && !event.target.closest('.right-sidebar') && !event.target.closest('.settings-icon')) {
            console.log(!event.target.closest('.settings-icon'))
            console.log(Boolean(event.target.closest('.settings-icon')))
            dispatch({ type: 'CLOSE_TASKSIDEBAR' })
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[isOpenTaskSidebar]);

    return (
        <aside className={`right-sidebar ${isOpenTaskSidebar ? 'active' : ''}`} >
            <div className="sidebar-menu">
                <ul>
                    <li>chat</li>
                    <li>messages</li>
                    <li>todos</li>
                </ul>
            </div>
            <div className="deivder"></div>
            <div className="search-bar">
                <div className="right-sidebar-title">
                    <i className="fa fa-ellipsis-h"></i>
                    <h4>users</h4>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="input-group">
                    <input type="text" placeholder="search" className="search-input" />
                    <i className="fa fa-search search-icon" aria-hidden="true"></i>
                </div>
            </div>
            <div className="deivder"></div>
            <div className="right-sidebar-body">
                <ul>
                    <li>
                        <img src="./images/profile.PNG" alt="" />
                        <div className="chat-info">
                            <p>rayan</p>
                            <span>hello i was windering if you could talk to me ?!</span>
                        </div>
                    </li>
                    <li>
                        <img src="./images/profile.PNG" alt="" />
                        <div className="chat-info">
                            <p>rayan</p>
                            <span>hello i was windering if you could talk to me ?!</span>
                        </div>
                    </li>
                    <li>
                        <img src="./images/profile.PNG" alt="" />
                        <div className="chat-info">
                            <p>rayan</p>
                            <span>hello i was windering if you could talk to me ?!</span>
                        </div>
                    </li>
                    <li>
                        <img src="./images/profile.PNG" alt="" />
                        <div className="chat-info">
                            <p>rayan</p>
                            <span>hello i was windering if you could talk to me ?!</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
export default TaskSidebar