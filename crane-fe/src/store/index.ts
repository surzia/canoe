import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storyReducer from "./story/reducer";

export const store = configureStore({
  reducer: {
    story: storyReducer,
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
