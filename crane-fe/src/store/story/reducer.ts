import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState: IStory = {
  content: "",
};

export const viewStoryById = createAsyncThunk(
  "story/viewById",
  (sid: String) => {
    return fetch(`http://localhost:8001/story/view?id=${sid}`).then((r) =>
      r.json()
    );
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
      fetch("http://localhost:8001/story/create", {
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
          window.location.href = "/view/" + data.data.sid;
        });
    },
    writingStory: (state, value: PayloadAction<string>) => {
      state.content = value.payload;
    },
    updateStory: (state, value: PayloadAction<String>) => {
      fetch("http://localhost:8001/story/update", {
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
          window.location.href = "/view/" + data.data.sid;
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewStoryById.pending, (state, action) => {});
    builder.addCase(viewStoryById.fulfilled, (state, { payload }) => {
      state.content = payload.data.content;
    });
  },
});

export const { addStory, writingStory, updateStory } = storySlice.actions;

export const selectStory = (state: RootState) => state;

export default storySlice.reducer;
