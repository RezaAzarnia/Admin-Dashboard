import { useQuery, useQueryClient } from 'react-query'

export default function useFetchSingleItem(key, id, getSingleItemFunction) {
    const queryClent = useQueryClient()
    return useQuery([`single ${key} Item`, id], async () => {
        return await getSingleItemFunction(id)
    }, {
        initialData: () => {
            const items = queryClent.getQueryData(key).pages;
            const singleItem = items?.find(item => item.id === +id)
            return singleItem
        }
    })
}
