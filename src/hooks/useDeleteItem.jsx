import { useMutation, useQueryClient } from 'react-query'

export default function useDeleteItem(deleteFunction, key, id) {
    const queryClient = useQueryClient()
    return useMutation(deleteFunction, {
        onSuccess: () => {
            const oldValue = queryClient.getQueryData(key)
            const newValues = oldValue.filter(item => item.id !== +id)
            queryClient.setQueryData(key, newValues)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}
