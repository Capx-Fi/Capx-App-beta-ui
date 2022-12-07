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
  isLoggedIn: false,
  isUserNameSet : false,
  questData : [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state,action) => {
      state.isLoggedIn=false;
    },
    setUserName: (state,action) => {
      state.username = action.payload.username;
    },
    setUser: (state,action) => {
      state.isUserNameSet = (action.payload.username&&action.payload.username!=="")?true:false
      state.isLoggedIn = action.payload.email?true:false;
      state.docType = action.payload.docType;
      state.earned_rewards = action.payload.earned_rewards;
      state.email = action.payload.email;
      state.image_url = action.payload.image_url;
      state.invite_code = action.payload.generated_invite_code;
      state.invites = action.payload.invites;
      state.join_tag = action.payload.join_tag;
      state.level = action.payload.level;
      state.name = action.payload.name;
      state.rank = action.payload.rank;
      state.socials = action.payload.socials;
      state.tasks_completed = action.payload.quests_completed;
      state.username = action.payload.username;
      state.wallets = action.payload.wallets;
      state.registered_on = action.payload.registered_on;
      state.questData = [];
    },
    setUserWithQuest: (state,action) => {
      state.questData = action.payload.quest_data;
    }
  }
});

export const { setUser, setUserName, resetUser, setUserWithQuest } = userSlice.actions;

export default userSlice.reducer;
