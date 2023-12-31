import React from 'react'
import './SectionHeader.scss'
export default function SectionHeader({title}) {
    return (
        <div className="section-header">
            <h2 className='section-header-title'>{title}</h2>
        </div>
        )
}
