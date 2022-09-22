import { configureStore } from "@reduxjs/toolkit";
import cartsSlice from "./carts/cartsSlice";
import productSlice from "./products/productSlice";
import dataSlice from "./users/dataSlice";
import userSlice from "./users/userSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        datas:dataSlice,
        products:productSlice,
        carts:cartsSlice
    }
})
