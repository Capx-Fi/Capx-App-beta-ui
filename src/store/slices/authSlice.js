import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    isAuthReady:false,
    isLoggedIn:false,
    user: null,
    accessToken : null,
    isUserProfileSet : false,
    uid : null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers :{
        setAuthStatus : (state,action) => {
            state.isAuthReady = action.payload.isAuthReady;
            state.user = action.payload.user;
            state.accessToken =  action.payload.user?action.payload.user.accessToken:null;
            state.isLoggedIn = action.payload.user && action.payload.user.uid?true:false;
            state.isUserProfileSet = action.payload.isUserProfileSet;
        },
        setLoggedInUser : (state,action) =>{
            state.isLoggedIn = action.payload.user && action.payload.user.uid?true:false;
            state.user = action.payload.user;
            state.accessToken = action.payload.user?action.payload.user.accessToken:null;
            state.isUserProfileSet = action.payload.isUserProfileSet;
        },
        setUserProfileComplete : (state,action) => {
            state.isUserProfileSet = true;
            state.isLoggedIn = state.isLoggedIn;
            state.user =  state.user;
            state.accessToken = state.accessToken;
        },
        resetAuth : (state,action) => {
            state.user = null;
            state.accessToken = null
        },
        logoutUser : (state,action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null;
            state.isUserProfileSet = false;
        }
        
    }
})

export const { setAuthStatus, setLoggedInUser, resetAuth, logoutUser, setUserProfileComplete } = authSlice.actions;

export default authSlice.reducer; 