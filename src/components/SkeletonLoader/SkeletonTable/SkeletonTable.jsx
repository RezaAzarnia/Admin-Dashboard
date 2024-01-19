import React from 'react'
import './SkeletonTable.scss'
export default function SkeletonTable() {
    return (
        <div className='table-skeleton'>
            {
                Array.from({ length: 5 }, (_, i) => {
                    return <div className="row" key={i + 1}>
                        {
                            Array.from({ length: 5 }, (_, i) => {
                                return <div className="skeleton" key={i + 1} ></div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}
