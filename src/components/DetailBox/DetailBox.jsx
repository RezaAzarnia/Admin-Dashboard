import React, { useEffect, useState } from 'react'
import "./DetailBox.scss";

export default function DetailBox({ title, symbol, count }) {
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        if (counter < count) {
            const counterInterval = setInterval(() => {
                setCounter(prev => prev + 1)
            }, 20);

            return () => clearInterval(counterInterval)
        } else {
            setCounter(count)
        }

    }, [count, counter])

    return (
        <div className="detail-box">
            <div className="box-info">
                <h3 className="box-counter">{counter}</h3>
                <span className="box-content">{title}</span>
            </div>
            <div className="symbol-side">
                {symbol}
            </div>
        </div>
    )
}
