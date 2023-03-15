import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST } from "../../common";

const initialState: ImageList = {
  list: [],
};

export const getAllImageList = createAsyncThunk("image/list", async () => {
  try {
    const response = await fetch(`${BACKEND_API_HOST}/image/list`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
});

export const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllImageList.pending, (state, action) => {});
    builder.addCase(getAllImageList.fulfilled, (state, { payload }) => {
      let tmp: Image[] = payload.data;
      let ret: Image[] = [];
      for (let index = 0; index < tmp.length; index++) {
        ret.push({
          sid: tmp[index].sid,
          filename: BACKEND_API_HOST + "/images/" + tmp[index].filename,
        });
      }
      state.list = ret;
    });
  },
});

export const imageState = (state: RootState) => state;

export default imageSlice.reducer;
