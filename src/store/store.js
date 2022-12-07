import { configureStore,combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import questReducer from "./slices/questSlice";

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  quest: questReducer
});

const rootReducer = (state, action) => {
  console.log(action);
  // if (action.type === 'auth/resetAuth' || action.type === 'user/resetUser') {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()]
});