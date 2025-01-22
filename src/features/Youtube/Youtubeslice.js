import { createSlice } from "@reduxjs/toolkit";
import { GetHomePageVideos } from "../../Store/reducers/GetHomePageVideos";
import { GetSearchPageVideos } from "../../Store/reducers/GetSearchPageVideos";
import { GetRecommendedVideos } from "../../Store/reducers/getrecommendedVideo";
import { getVideoDetails } from "../../Store/reducers/getVideoDetails";

const initialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: [] 
};

const youtubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers: {
        clearVideos: (state) => {
            state.videos = [];
            state.nextPageToken = null;
        },
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetHomePageVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        });
        builder.addCase(GetSearchPageVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        });
        builder.addCase(GetRecommendedVideos.fulfilled, (state, action) => {
            if (action.payload && action.payload.parsedData) {
                
                state.recommendedVideos = action.payload.parsedData;
            }
        });
        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentPlaying = action.payload;
            }
        });
    }
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } = youtubeSlice.actions;
export default youtubeSlice.reducer;
