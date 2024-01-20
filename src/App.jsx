import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from "./routes";
import { SidebarProvider } from './Context/SidebarContext.jsx';

export default function App() {
  const router = useRoutes(routes)

  return (
    <SidebarProvider>
      {router}
    </SidebarProvider>
  )
}

