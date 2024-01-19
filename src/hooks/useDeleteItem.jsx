import { useMutation, useQueryClient } from 'react-query'

const useDeleteItem = (deleteFunction, key, id, page, setPage, totalPage, itemsSizePerPage = 5, successCallback, errorCallback) => {
    const queryClient = useQueryClient()
    return useMutation(deleteFunction, {
        onSuccess: (success) => {
            const oldValue = queryClient.getQueryData(key)
            const newValues = oldValue.filter(item => item.id !== +id)
            queryClient.setQueryData(key, newValues)
            successCallback && successCallback(success);
            // refecth data(if values in the other page == 1 and want to get it here)
            if (page < totalPage) {
                queryClient.invalidateQueries(key)
                //referch if the last page all values deletd
            } else if (newValues.length % itemsSizePerPage === 0) {
                setPage(prev => prev - 1)
            }
        },
        onError: (error) => {
            errorCallback && errorCallback(error)
        }
    })
}
export default useDeleteItem