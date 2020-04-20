import {CHOOSE_CANDIDATE}
    from "../actionTypes";

const initialState = {
    candidateNameSelected: null
};

export default function(state = initialState, action) {
    switch (action.type){
        case CHOOSE_CANDIDATE: {
            const {candidateName} = action.payload;
            return {
                ...state,
                candidateNameSelected: candidateName
            };
        }
        default:
            return state;
    }
}