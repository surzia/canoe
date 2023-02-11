import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storyReducer from "./story/reducer";
import feedReducer from "./feed/reducer";

export const store = configureStore({
  reducer: {
    story: storyReducer,
    feeds: feedReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
