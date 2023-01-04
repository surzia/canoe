import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storyReducer from "./story/reducer";
import searchReducer from "./search/reducer";

export const store = configureStore({
  reducer: {
    story: storyReducer,
    search: searchReducer,
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
