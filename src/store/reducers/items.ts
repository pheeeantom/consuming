import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
    id: number,
    name: string,
    price: number,
    picture: string,
}

export type Category = {
    id: number,
    name: string,
}

type Categories = {
    cat: number,
    items: Array<Item>,
}

const initialState: Categories = {
    cat: undefined,
    items: []
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.cat = action.payload;
        },
    }
});

const { actions, reducer } = itemsSlice;

// export individual action creator functions
export const { setCategory } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;