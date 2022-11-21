import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  username: "",
  image: "",
  loggedin: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setLoggeding: (state, action) => {
      state.loggedin = action.payload.loggedin;
    },
  },
});

export const { setUser, setLoggeding } = userSlice.actions;

export default userSlice.reducer;
