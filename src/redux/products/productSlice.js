import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const products_limit = 9;
export let pages = 0;

export const fetchProducts = createAsyncThunk("products/getProducts", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}?offset=${pages * products_limit}&limit=${products_limit}`)
    return res.data;
})


export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        hasNextPage: true
    },
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.status = "succeeded";
            pages += 1;

            if (action.payload.length < 9) {
                state.hasNextPage = false
            }

        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

    }
})

export default productSlice.reducer;