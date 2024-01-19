import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BreadCrump.scss'

export default function BreadCrump() {
    const [pathName, setPathName] = useState('')
    const location = useLocation()
    useEffect(() => {
        setPathName(location.pathname.split('/')[1])
    }, [])
    return (
        <div className="section-header-bread-crump">
            <div className="bread-crump-title">
                {
                    window.innerWidth < 600 ?
                        <h4>{pathName}</h4>
                        :
                        <h3>{pathName}</h3>
                }
            </div>
            <div className="breadcrump">
                <ol className='breadCrump-list'>
                    <li className='breadCrump-item di-active'>
                        <Link to='/'>dashboard</Link>
                    </li>
                    {">"}
                    <li className="breadCrump-item active">{pathName}</li>
                </ol>
            </div>
        </div>)
}
