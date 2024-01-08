import React, { useEffect } from 'react'
import './Paginator.scss'
export default function Paginator({ data, page, totalPage, setPage, isPreviousData }) {
    useEffect(() => {
        if (data?.length == 0) {
            setPage(prev => prev - 1)
            return
        }
    }, [data])

    return totalPage > 1 &&
        <nav className="pagination">
            <button
                className="pagination-btn prev"
                onClick={() => setPage(prev => prev - 1)}
                disabled={page === 1}>
                &laquo; Prev
            </button>

            <span className="current-page">{page}</span>

            <button
                className={`pagination-btn next`}
                onClick={() => setPage(prev => prev + 1)}
                disabled={page >= totalPage || isPreviousData}
            >
                {isPreviousData ?
                    'Loading...' :
                    ' Next »'
                }
            </button>
        </nav>

}