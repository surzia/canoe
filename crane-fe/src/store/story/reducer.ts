import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState: IStory = {
  content: "",
};

export const storySlice = createSlice({
  name: "story",
  initialState: initialState,
  reducers: {
    addStory: (state) => {
      console.log("here");
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
        .then(() => {
          window.location.href = "/";
        });
    },
    writingStory: (state, value: PayloadAction<string>) => {
      state.content = value.payload;
    },
  },
});

export const { addStory, writingStory } = storySlice.actions;

export const selectStory = (state: RootState) => state;

export default storySlice.reducer;
