import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./users/dataSlice";
import userSlice from "./users/userSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        datas:dataSlice
    }
})
