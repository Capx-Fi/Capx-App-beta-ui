import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    allQuests:[],
    currentQuest:{
        questId : "",
        quest_start_time : "",
        quest_actions : [],
        quest_status_complete : false,
        quest_submission : "",
        quest_title : "",
        quest_description : ""
    },
    currentAction : {
        actionId : "",
        action_start_date : "",
        action_title : "",
        action_option : [],
        action_submission : ""
    }
}

export const questSlice = createSlice({
    name:"quests",
    initialState,
    reducers :{
        setQuestsData : (state,action) => {
            state.allQuests = action.payload.allQuests;
        },
        setCurrentQuest : (state,action) =>{
            state.currentQuest.questId = action.payload.questId;
            state.currentQuest.quest_actions = action.payload.quest_actions;
            state.currentQuest.quest_submission = action.payload.quest_submission;
            state.currentQuest.quest_title = action.payload.quest_title;
            state.currentQuest.quest_description = action.payload.quest_description;
        },
        setCurrentAction : (state,action) => {  
            state.currentAction.actionId = action.payload.actionId;
            state.currentAction.action_title = action.payload.action_title;
            state.currentAction.action_option = action.payload.action_option;
            state.currentAction.action_submission = action.payload.action_submission;
        },
        resetQuestData : (state,action) => {
					state.allQuests = [];
					state.currentQuest={
							questId : "",
							quest_start_time : "",
							quest_actions : [],
							quest_status_complete : false,
							quest_submission : "",
							quest_title : "",
							quest_description : ""
					}
					state.currentAction = {
							actionId : "",
							action_start_date : "",
							action_title : "",
							action_option : [],
							action_submission : ""
					}
        }
    }
})

export const { setQuestsData, setCurrentQuest, setCurrentAction, resetQuestData } = questSlice.actions;

export default questSlice.reducer; 