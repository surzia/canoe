import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST, setLoginState } from "../../common";

const loginState = localStorage.getItem("login");

const initialState: Sync = {
  login: loginState ? JSON.parse(loginState) : false,
};

export const loginCloud = createAsyncThunk(
  "sync/loginCloud",
  async (props: { user: string; password: string }) => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/sync/save`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: props.user,
          password: props.password,
        }),
      });
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const syncSlice = createSlice({
  name: "sync",
  initialState: initialState,
  reducers: {
    upload: (state, value: PayloadAction<string>) => {
      if (!state.login) {
        return;
      }
      fetch(`${BACKEND_API_HOST}/sync/upload`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: value.payload,
        }),
      });
    },
    download: (state, value: PayloadAction<string>) => {
      if (!state.login) {
        return;
      }
      fetch(`${BACKEND_API_HOST}/sync/download`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: value.payload,
        }),
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginCloud.pending, (state, action) => {});
    builder.addCase(loginCloud.fulfilled, (state, { payload }) => {
      if (payload.msg === "success") {
        state.login = true;
        setLoginState();
      }
    });
  },
});

export const { upload, download } = syncSlice.actions;

export const cloudState = (state: RootState) => state;

export default syncSlice.reducer;
