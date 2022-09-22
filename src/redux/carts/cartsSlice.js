import { createSlice } from "@reduxjs/toolkit";

export const cartsSlice = createSlice({
    name: "carts",
    initialState: {
        items: [],
        status: true,
        length: 0
    },
    reducers: {
        getCartsLength: (state, action) => {
            state.length = action.payload;
            state.status = false;
        },
        addCarts: (state, action) => {
            state.items = action.payload;
            state.status = false;
        }
    }
})

export const { getCartsLength,addCarts } = cartsSlice.actions;

export default cartsSlice.reducer;