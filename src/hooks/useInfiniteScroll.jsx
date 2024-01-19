import { useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query'

export default function useInfiniteScroll(queryKey, queryFunction, limit = 4) {
    const [total, setTotal] = useState(1)
    return useInfiniteQuery(queryKey, async ({ pageParam = 1 }) => {
        const response = await queryFunction(pageParam, limit);
        setTotal(Math.max(response?.length / limit));
        return response?.data;
    },
        {
            getNextPageParam: (lastPage, pages) => {
                if (pages.length < total) {
                    return pages.length + 1
                }
            },
            select: useCallback((item) => {
                //flat=>make the 2d array in to single array
                return item?.pages?.flat()
            }, [])
        })
}
