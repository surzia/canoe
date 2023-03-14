import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BACKEND_API_HOST, goto } from "../../common";
import { RootState } from "../index";

const initialState: IStory = {
  content: "",
  days: [],
};

export const viewStoryById = createAsyncThunk(
  "story/viewById",
  async (sid: String) => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/story/view?id=${sid}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const highlightedDays = createAsyncThunk(
  "story/highlightedDays",
  async (month: String) => {
    try {
      const response = await fetch(
        `${BACKEND_API_HOST}/story/highlight?month=${month}`
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const storySlice = createSlice({
  name: "story",
  initialState: initialState,
  reducers: {
    addStory: (state) => {
      if (state.content === "") {
        return;
      }
      fetch(`${BACKEND_API_HOST}/story/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: state.content,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          goto("/view?sid=" + data.data.sid);
        });
    },
    writingStory: (state, value: PayloadAction<string>) => {
      state.content = value.payload;
    },
    updateStory: (state, value: PayloadAction<String>) => {
      fetch(`${BACKEND_API_HOST}/story/update`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: value.payload,
          content: state.content,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          goto("/view?sid=" + data.data.sid);
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewStoryById.pending, (state, action) => {});
    builder.addCase(viewStoryById.fulfilled, (state, { payload }) => {
      state.content = payload.data.content;
    });
    builder.addCase(highlightedDays.pending, (state, action) => {});
    builder.addCase(highlightedDays.fulfilled, (state, { payload }) => {
      state.days = payload.data;
    });
  },
});

export const { addStory, writingStory, updateStory } = storySlice.actions;

export const selectStory = (state: RootState) => state;

export default storySlice.reducer;
