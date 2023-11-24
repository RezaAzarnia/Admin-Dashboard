import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from "./routes";
import { SidebarProvider } from './context/SidebarContext.jsx';
import './App.scss'

export default function App() {
  const router = useRoutes(routes)
  return (
    <>
      <SidebarProvider>
        {router}
      </SidebarProvider>
    </>
  )
}

