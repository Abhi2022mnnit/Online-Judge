import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlicer'

export const store = configureStore({
    reducer : userReducer
})