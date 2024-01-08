import { useState } from 'react';
import { useInfiniteQuery } from 'react-query'

export default function useInfiniteScroll(queryKey, queryFunction, limit = 5) {
    const [total, setTotal] = useState(1)
    return useInfiniteQuery(queryKey, async ({ pageParam }) => {
        const response = await queryFunction(pageParam, limit);
        setTotal(Math.round(response.headers.get('X-Total-Count') / limit))
        return response.data
    }, {
        getNextPageParam: (lastPage, pages) => {
            if (pages.length < total) {
                return pages.length + 1
            } else {
                return false
            }
        }
    })
}
