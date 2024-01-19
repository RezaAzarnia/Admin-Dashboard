import React from 'react'
import './Table.scss'

import SkeletonTable from '../SkeletonLoader/SkeletonTable/SkeletonTable'
export default function Table({ isLoading, children }) {

    return (
        <div className="table-container" >
            {
                isLoading ?
                    <SkeletonTable />
                    : <table>
                        {children}
                    </table>
            }
        </div>
    )
}
