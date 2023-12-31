import React from 'react'
import { IoMdStar } from "react-icons/io";
import './RateShow.scss'
export default function RateShow({rate}) {
    return (
        <div className='rating'>
            {Array.from({ length: 5 }, (_, i) => (
                <IoMdStar
                    key={i + 1}
                    className={i < rate ? 'star-filled' : 'star-empty'}
                />
            ))}
        </div>
    )
}
