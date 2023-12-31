import React from 'react'
import Navbar from "../Navbar/Navbar"
import AppSidebar from '../AppSidebar/AppSidebar';
import TaskSidebar from '../TaskSidebar/TaskSidebar';
import { Outlet } from 'react-router-dom';
import { useSidebarContext } from '../../context/SidebarContext';
import './Layout.scss'
export default function Layout() {

    const { state: { isOpenMainSidebar } } = useSidebarContext()
    return (

        <>
            <Navbar />
            <AppSidebar />
            <TaskSidebar />
            <section className="main-section">
                <main className={`main ${isOpenMainSidebar ? '' : 'full-width'}`}>
                    <Outlet />
                </main>
            </section>
        </>

    )
}
