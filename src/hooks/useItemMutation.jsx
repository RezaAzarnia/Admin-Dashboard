import { useMutation, useQueryClient } from 'react-query'
export default function useItemMutation(mutationFunction, key, successCallback, errorCallback) {
    const queryClient = useQueryClient()
    return useMutation(mutationFunction, {
        onSuccess: (success) => {
            successCallback && successCallback(success)
            queryClient.invalidateQueries(key)
        },
        onError: (error) => {
            if (error) {
                errorCallback && errorCallback(error)
            }
        },
    })
}
