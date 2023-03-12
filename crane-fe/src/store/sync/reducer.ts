import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST, setLoginState } from "../../common";

const loginState = localStorage.getItem("login");

const initialState: Sync = {
  login: loginState ? JSON.parse(loginState) : false,
};

export const checkStatus = createAsyncThunk("sync/checkStatus", async () => {
  try {
    const response = await fetch(`${BACKEND_API_HOST}/sync/status`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
});

export const syncSlice = createSlice({
  name: "sync",
  initialState: initialState,
  reducers: {
    loginToNutstore: (_state, value: PayloadAction<SaveSyncReq>) => {
      fetch(`${BACKEND_API_HOST}/sync/save`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.payload),
      });
    },
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
    builder.addCase(checkStatus.pending, (state, action) => {});
    builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
      if (payload.msg === "success") {
        let servers: string[] = payload.data;
        let isLogin = true ? servers.length > 0 : false;
        state.login = isLogin;
        setLoginState(isLogin);
      }
    });
  },
});

export const { upload, download, loginToNutstore } = syncSlice.actions;

export const syncState = (state: RootState) => state;

export default syncSlice.reducer;
