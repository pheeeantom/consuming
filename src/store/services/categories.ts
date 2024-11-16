import { fetchBaseQuery, TypedUseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Category } from "../reducers/items";

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/api/cats'}),
    endpoints: (build) => ({
        fetchAllCategories: build.query<Category[], void>({
            query: () => ``
        })
    })
});

export const { useFetchAllCategoriesQuery }: {
    useFetchAllCategoriesQuery: TypedUseQuery<Category[], void, any>
} = categoriesAPI;