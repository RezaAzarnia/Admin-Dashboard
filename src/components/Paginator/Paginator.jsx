import React, { useEffect } from 'react'
import './Paginator.scss'
export default function Paginator({ page, totalPage, setPage, isPreviousData }) {
    return totalPage > 1 &&
        <div className='row-pagination'>
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
            <span>Page {page} of {totalPage}</span>
        </div>

}