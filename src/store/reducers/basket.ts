import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BasketItem = {
    id: number,
    amount: number,
}

type Basket = {
    sum: number,
    items: Array<BasketItem>,
}

const initialState: Basket = {
    sum: 0,
    items: []
}

export const itemsSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket(state, action: PayloadAction<[number, number]>) {
            let exists = false;
            let newState = state.items.map((item: BasketItem) => {
                if (item.id === action.payload[0]) {
                    exists = true;
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
            if (!exists) {
                state.items = [ ...state.items, { id: action.payload[0], amount: 1 }];
            } else {
                state.items = newState;
            }
            state.sum += action.payload[1];
        },
        removeFromBasket(state, action: PayloadAction<[number, number]>) {
            state.sum -= action.payload[1] * state.items.find(item => item.id === action.payload[0]).amount;
            state.items = state.items.filter(item => item.id !== action.payload[0]);
        },
    }
});

const { actions, reducer } = itemsSlice;

// export individual action creator functions
export const { addToBasket, removeFromBasket } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;