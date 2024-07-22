import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    myToken : localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : "",
    myUser : localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {}
}

export const ProfileSlice = createSlice({
    name : "userProfile",
    initialState : initialState,
    reducers : {
        setUser : (state, action) => {
            state.myUser = action.payload;
        },
        setToken : (state, action) => {
            state.myToken = action.payload;
        }
    }
})

export const {setUser, setToken} = ProfileSlice.actions;
export default ProfileSlice.reducer;