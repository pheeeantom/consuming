import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import itemsReducer from './reducers/items';
import basketReducer from './reducers/basket';
import { categoriesAPI } from './services/categories';
import { itemsAPI } from './services/items';

export const setupStore = () => {
    const store = configureStore({
        reducer: {
            itemsReducer,
            basketReducer,
            [categoriesAPI.reducerPath]: categoriesAPI.reducer,
            [itemsAPI.reducerPath]: itemsAPI.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoriesAPI.middleware)
            .concat(itemsAPI.middleware)
    });

    setupListeners(store.dispatch);

    return store;
}