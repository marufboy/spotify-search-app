import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './token/tokenSlice'
import userReducer from './token/userSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
