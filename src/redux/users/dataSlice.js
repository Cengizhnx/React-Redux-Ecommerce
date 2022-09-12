import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "datas",
    initialState: {
        data: JSON.parse(localStorage.getItem("data")) ?? false,
        status: true,
    },
    reducers: {
        setDatas: (state, action) => {
            localStorage.setItem("data", JSON.stringify(action.payload))
            state.data = action.payload;
            state.status = false
        },
    }
})

export const { setDatas } = dataSlice.actions;

export default dataSlice.reducer;