import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    login: false,
};

export default createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin:(state, action) => {
            // console.log(action);
            
            state.login = action.payload;
            // console.log(state.login);
            
        },
    }
})
