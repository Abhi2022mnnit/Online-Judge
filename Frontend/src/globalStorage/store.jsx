import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './SignupSlice'
import userProfileReducer from './ProfileSlice'

export const store = configureStore({
    reducer : combineReducers({userReducer, userProfileReducer})
})