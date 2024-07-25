import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theUser: {},
    myToken: localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : null,
    myUser: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {},
    step : 1,
    problem : localStorage.getItem("Problem") ? JSON.parse(localStorage.getItem("Problem")) : {}
}

export const SignupSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {        // Data must be in key-function pair
        addUser: (state, action) => {
            state.theUser = action.payload
        },
        setUser: (state, action) => {
            state.myUser = action.payload;
        },
        setToken: (state, action) => {
            state.myToken = action.payload;
        },
        setStep : (state, action) => {
            state.step = action.payload;
        },
        setProblem : (state, action) => {
            state.problem = action.payload;
        }
    }
})

export const { addUser, setUser, setToken, setStep, setProblem } = SignupSlice.actions;
export default SignupSlice.reducer;