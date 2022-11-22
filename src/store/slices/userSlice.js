import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  image_url: "",
  join_number: "",
  level: "",
  rank: "",
  socials: {},
  wallets: {},
  email: "",
  image: "",
  loggedin: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.image_url = action.payload.image_url;
      state.join_number = action.payload.join_number;
      state.level = action.payload.level;
      state.rank = action.payload.rank;
      state.socials = action.payload.socials;
      state.wallets = action.payload.wallets;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.loggedin = action.payload.loggedin;
    },
    setLoggeding: (state, action) => {
      state.loggedin = action.payload.loggedin;
    },
  },
});

export const { setUser, setLoggeding } = userSlice.actions;

export default userSlice.reducer;
