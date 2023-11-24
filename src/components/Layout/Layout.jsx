import React from 'react'
import Navbar from "../Navbar/Navbar";
import Sidebar from '../Sidebar/Sidebar';
import TaskSidebar from '../TaskSidebar/TaskSidebar';
import { Outlet } from 'react-router-dom';
import './Layout.scss'
export default function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <TaskSidebar />
            <section className="main-section">
                <main>
                    <Outlet />
                </main>
            </section>
        </>
    )
}
