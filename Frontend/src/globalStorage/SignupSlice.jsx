import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theUser: {},
}

export const SignupSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {        // Data must be in key-function pair
        addUser: (state, action) => {
            state.theUser = action.payload
        }
    }
})

export const { addUser } = SignupSlice.actions;
export default SignupSlice.reducer;