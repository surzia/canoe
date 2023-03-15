import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST } from "../../common";

const initialState: Charts = {
  bar: [],
};

export const getStoryStatistics = createAsyncThunk(
  "charts/statistics",
  async () => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/story/statistics`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStoryStatistics.pending, (state, action) => {});
    builder.addCase(getStoryStatistics.fulfilled, (state, { payload }) => {
      state.bar = payload.data;
      state.bar.sort((x, y) => x.year - y.year);
    });
  },
});

export const chartState = (state: RootState) => state;

export default chartSlice.reducer;
