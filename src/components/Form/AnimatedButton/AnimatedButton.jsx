import React from 'react'
import './AnimatedButton.scss'
export default function AnimatedButton({ Icon, title, mode = 'success' }) {
    return (
        <div className="Animated-button">
            <button className={`animated-btn ${mode}`}>
                <Icon className='btn-icon' />
                <span>{title}</span>
            </button>
        </div>
    )
}
