import { useCallback } from 'react'
import { useQuery } from 'react-query'

export default function useFetchItem(queryName, fetchFunction) {
    return useQuery(queryName, useCallback(async () => {
        try {
            return await fetchFunction();
        } catch (error) {
            return Promise.reject(
                'An error occurred while fetching data.'
            );
        }

    }, []), {
        onError: (error) => {
            // console.log(error)
        }
    })
}
