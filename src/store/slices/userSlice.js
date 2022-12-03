import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docType: "",
  earned_rewards: "",
  email: "",
  image_url: "",
  invite_code: "",
  invites: "",
  join_tag: "",
  level: "",
  name: "",
  rank: "",
  socials: {},
  tasks_completed: "",
  username: "",
  wallets: "",
  registered_on : "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state, action) => {
      state.docType = "" ;
      state.earned_rewards = "";
      state.email = "";     
      state.image_url = "";
      state.invite_code = "" ;
      state.invites = "" ;
      state.join_tag = "" ;
      state.level = "";      
      state.name =  "";    
      state.rank = "" ;    
      state.socials ="" ;
      state.tasks_completed ="" ;
      state.username ="" ;
      state.wallets ="" ;
      state.registered_on ="" ;
    },
    setUserName: (state,action) => {
      state.username = action.payload.username;
    },
    setUser: (state,action) => {
      state.docType = action.payload.docType;
      state.earned_rewards = action.payload.earned_rewards;
      state.email = action.payload.email;
      state.image_url = action.payload.image_url;
      state.invite_code = action.payload.invite_code;
      state.invites = action.payload.invites;
      state.join_tag = action.payload.join_tag;
      state.level = action.payload.level;
      state.name = action.payload.name;
      state.rank = action.payload.rank;
      state.socials = action.payload.socials;
      state.tasks_completed = action.payload.tasks_completed;
      state.username = action.payload.username;
      state.wallets = action.payload.wallets;
      state.registered_on = action.payload.registered_on;
    }
  }
});

export const { setUser, setUserName, resetUser } = userSlice.actions;

export default userSlice.reducer;
