import { useMutation, useQueryClient } from 'react-query'
export default function useItemMutation(createFunction, key) {
    const queryClient = useQueryClient()
    return useMutation(createFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries(key)
        },
        onError: (error) => {
            throw error;
        },
    })
}
