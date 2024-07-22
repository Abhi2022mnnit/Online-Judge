import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // theUser : {userName, firstName, lastName, emailAddress, accountType, password, confirmPassword}
    theUser : null
}

export const userSlicer = createSlice({
    name : "user",
    initialState,
    reducers : {        // Data must be in key-function pair
        addUser : (state, action) => {
            state.theUser = action.payload
        }
    }
})

export const {addUser} = userSlicer.actions;
export default userSlicer.reducer;