import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import questReducer from "./slices/questSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    quest: questReducer
  },
});