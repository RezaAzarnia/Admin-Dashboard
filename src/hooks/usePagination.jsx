import { useQuery } from 'react-query'
import { useState } from 'react'

export default function usePagination(queryKey, getFunction, page, limit = 5) {
    const [totalPage, setTotalPage] = useState(null)
    const { data, isPreviousData, isError, error, isLoading } =
        useQuery({
            queryKey: [queryKey, page],
            queryFn: async () => {
                    const response = await getFunction(page, limit)
                    setTotalPage(
                        Math.ceil(response?.length / limit)
                    )
                    return response?.data
            },
            keepPreviousData: true,
        }, {
            onError: (error) => {
                console.log(error)
            }
        })
    //this will count the index of the tables row because we get the items per page and the count will change
    const computedIndex = page * limit - limit + 1
    return { data, isPreviousData, isError, error, isLoading, totalPage, computedIndex }

}
