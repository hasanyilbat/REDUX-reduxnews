import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  newsList: [],
  loading: true,
};
const API_KEY = "1a65b7b670ad40fdad5b06f3da8b2b2f";

export const getNews = createAsyncThunk("news/getNews", async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
  try {
    const { data } = await axios(url);
    return data.articles;
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: {
    [getNews.pending]: (state, action) => {
      state.loading = true;
    },
    [getNews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.newsList = payload;
    },
    [getNews.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
