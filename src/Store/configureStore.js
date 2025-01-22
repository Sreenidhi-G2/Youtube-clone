import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from '../features/Youtube/Youtubeslice'

const store =configureStore({
    reducer:{
        youtubeApp:youtubeReducer,
    }
})
export default store;