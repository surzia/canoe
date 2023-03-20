import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { BACKEND_API_HOST, goto } from "../../common";
import { RootState } from "../index";

const initialState: Story = {
  sid: "",
  created_at: "",
  paragraph: [],
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

export const uploadImage = createAsyncThunk(
  "story/uploadImage",
  async (props: FormData) => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/image/upload`, {
        method: "post",
        body: props,
      });
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
    updateStoryImage: (state) => {
      // state.has_images = true;
    },
    addStory: (state) => {
      if (state.paragraph.length === 0) {
        return;
      }
      fetch(`${BACKEND_API_HOST}/story/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paragraph: state.paragraph,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          goto("/view?sid=" + data.data);
        });
    },
    writingStory: (state, value: PayloadAction<Paragraph[]>) => {
      state.paragraph = value.payload;
    },
    deleteParagraph: (
      state,
      value: PayloadAction<{ index: number; typo: number }>
    ) => {
      if (value.payload.typo === 3) {
        fetch(`${BACKEND_API_HOST}/image/delete`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: state.paragraph[value.payload.index].data,
          }),
        });
      }
      state.paragraph.splice(value.payload.index, 1);
    },
    updateParagraph: (
      state,
      value: PayloadAction<{ content: string; index: number }>
    ) => {
      state.paragraph[value.payload.index].data = value.payload.content;
    },
    updateStory: (state, value: PayloadAction<String>) => {
      fetch(`${BACKEND_API_HOST}/story/update`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: value.payload,
          paragraph: current(state.paragraph),
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          goto("/view?sid=" + data.data);
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewStoryById.pending, (state, action) => {});
    builder.addCase(viewStoryById.fulfilled, (state, { payload }) => {
      state.paragraph = payload.data.content;
      state.sid = payload.data.sid;
      state.created_at = payload.data.created_at;
    });

    builder.addCase(highlightedDays.pending, (state, action) => {});
    builder.addCase(highlightedDays.fulfilled, (state, { payload }) => {
      state.days = payload.data;
    });

    builder.addCase(uploadImage.pending, (state, action) => {});
    builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
      state.paragraph.push({
        pid: "",
        sequence: 1,
        data: payload.data.Filename,
        typo: 3,
      });
    });
  },
});

export const {
  addStory,
  writingStory,
  updateStory,
  updateStoryImage,
  deleteParagraph,
  updateParagraph,
} = storySlice.actions;

export const selectStory = (state: RootState) => state;

export default storySlice.reducer;
