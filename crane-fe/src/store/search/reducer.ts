import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST } from "../../common";

const initialState: ISearch[] = [];

export const searchStory = createAsyncThunk(
  "search/story",
  async (keyword: String) => {
    try {
      const response = await fetch(
        `${BACKEND_API_HOST}/story/search?wd=${keyword}`
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchStory.pending, (state, action) => {});
    builder.addCase(searchStory.fulfilled, (state, { payload }) => {
      state = payload.data;
    });
  },
});

export const searchResults = (state: RootState) => state;

export default searchSlice.reducer;
