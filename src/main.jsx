import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './styles/main.scss'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
