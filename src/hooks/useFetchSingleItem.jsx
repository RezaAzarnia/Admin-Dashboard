import { useQuery, useQueryClient } from 'react-query';

export default function useFetchSingleItem(key, id, getSingleItemFunction) {
    const queryClient = useQueryClient();

    return useQuery([`single ${key} Item`, id], async () => {
        return await getSingleItemFunction(id);
    }, {
        initialData: () => {
            const queryData = queryClient.getQueryData(key);
            if (!queryData) {
                return null; // or handle the case when data is not available yet
            }
            const items = queryData.pages ? queryData.pages.flat() : queryData
            const singleItem = items?.find(item => item.id === +id);

            return singleItem;
        },
    });
}
