import { fetchBaseQuery, TypedUseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Item } from "../reducers/items";

export const itemsAPI = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/api/items'}),
    endpoints: (build) => ({
        fetchCatItems: build.query<Item[], number>({
            query: (id) => `?id=${id}`
        })
    })
});

export const { useFetchCatItemsQuery }: {
    useFetchCatItemsQuery: TypedUseQuery<Item[], number, any>
} = itemsAPI;