import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST, setLoginState } from "../../common";

const loginState = localStorage.getItem("login");

const initialState: Sync = {
  login: loginState ? JSON.parse(loginState) : false,
  uploadLoading: false,
  downloadLoading: false,
  loading: false,
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

export const upload = createAsyncThunk(
  "sync/upload",
  async (props: SyncReq) => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/sync/upload`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      });
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const download = createAsyncThunk(
  "sync/download",
  async (props: SyncReq) => {
    try {
      const response = await fetch(`${BACKEND_API_HOST}/sync/download`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      });
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const sync = createAsyncThunk("sync/sync", async (props: SyncAllReq) => {
  try {
    const response = await fetch(`${BACKEND_API_HOST}/sync/sync`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
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
      })
        .then((r) => r.json())
        .then(() => {
          window.location.reload();
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
    builder.addCase(upload.pending, (state) => {
      state.uploadLoading = true;
    });
    builder.addCase(upload.fulfilled, (state) => {
      state.uploadLoading = false;
    });
    builder.addCase(download.pending, (state) => {
      state.downloadLoading = true;
    });
    builder.addCase(download.fulfilled, (state) => {
      state.downloadLoading = false;
    });
    builder.addCase(sync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sync.fulfilled, (state) => {
      state.loading = false;
      window.location.reload();
    });
  },
});

export const { loginToNutstore } = syncSlice.actions;

export const syncState = (state: RootState) => state;

export default syncSlice.reducer;
