import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawtostring } from "../../utils/convertRawTostring";
import { timeSince } from "../../utils/TimeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "youtube/App/videoDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data: { items } } = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&id=${id}`
      );

      // Ensure that the item exists in the response
      if (!items || items.length === 0) {
        return rejectWithValue("Video details not found");
      }

      const parsedData = await parseData(items[0]);
      return parsedData;
    } catch (error) {
      console.error("Error fetching video details:", error);
      // Catch errors from axios or parseData
      if (error.response) {
        // If error is from axios response, you can log detailed error
        console.error("Axios Error:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        // For other errors, such as network or internal
        return rejectWithValue(error.message);
      }
    }
  }
);

const parseData = async (item) => {
  try {
    const channelResponse = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
    );

    const snippet = item.snippet;
    const id = item.id;
    const statistics = item.statistics;

    // Ensure channel response contains items
    if (channelResponse.data.items && channelResponse.data.items.length > 0) {
      const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
      const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

      return {
        videoId: id,
        videoTitle: snippet.title,
        videoDescription: snippet.description,
        videoViews: convertRawtostring(statistics?.viewCount),
        videoLikes: convertRawtostring(statistics?.likeCount),
        videoAge: timeSince(new Date(snippet.publishedAt)),
        channelInfo: {
          id: snippet.channelId,
          image: channelImage,
          name: snippet.channelTitle,
          subscribers: convertRawtostring(subscriberCount, true),
        }
      };
    } else {
      throw new Error("Channel details not found");
    }
  } catch (error) {
    console.error("Error parsing video details:", error);
    throw new Error("Error fetching channel details"); // Clearer error message for debugging
  }
};
