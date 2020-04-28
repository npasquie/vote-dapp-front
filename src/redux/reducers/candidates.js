import {ADD_CANDIDATE,CHANGE_CANDIDATE_NAME,REMOVE_CANDIDATE}
from "../actionTypes";

const initialState = {
    candidateNames : ["",""]
};

export default function(state = initialState, action) {
    switch (action.type){
        case ADD_CANDIDATE: {
            return {
                ...state,
                candidateNames: [...state.candidateNames,""]
            };
        }
        case CHANGE_CANDIDATE_NAME: {
            const {id,name} = action.payload;
            return {
                ...state,
                candidateNames: changeOneElInArray(
                    state.candidateNames,id,name)
            }
        }
        case REMOVE_CANDIDATE: {
            return {
                ...state,
                candidateNames:
                    state.candidateNames.slice(
                        0,state.candidateNames.length - 1)
            }
        }
        default:
            return state;
    }
}

function changeOneElInArray(arr,index,newEl) {
    let ret = [];
    ret = ret.concat(
        arr.slice(0,index), newEl, arr.slice(index+1,arr.length));
    return ret;
}