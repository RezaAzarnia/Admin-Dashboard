import { useQuery } from 'react-query'

export default function useFetchItem(queryName, fetchFunction) {
    return useQuery(queryName, async () => {
        return await fetchFunction()
    })
}
