import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    loggedin:false,
    isAuthReady:false,
    user: null,
    accessToken : null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers :{
        setAuthStatus : (state,action) => {
            state.isAuthReady = action.payload.isAuthReady;
            state.loggedin = action.payload.user && action.payload.user.email !== null ?true:false;
            state.user = action.payload.user;
            state.accessToken =  action.payload.user?action.payload.user.accessToken:null;
        },
        setLoggedInUser : (state,action) =>{
            state.user = action.payload.user;
            state.loggedin = action.payload.user?true:false;
            state.accessToken = action.payload.user?action.payload.user.accessToken:null;
        },
        resetAuth : (state,action) => {
            state.isAuthReady = true;
            state.loggedin = false;
            state.user = null;
            state.accessToken =  null;
        }
    }
})

export const { setAuthStatus, setLoggedInUser, resetAuth } = authSlice.actions;

export default authSlice.reducer; 