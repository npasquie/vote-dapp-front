import {CHOOSE_CANDIDATE, SET_VOTE_ELEM}
    from "../actionTypes";

const initialState = {
    candidateNameSelected: null,
    ballotName: null,
    code: null,
    candidateNames: null,
    title: null,
    question: null,
    error: null
    // contract is in ethereum reducer
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
        case SET_VOTE_ELEM: {
            const {elem,data} = action.payload;
            switch (elem) {
                case "error": {
                    return {
                        ...state,
                        error: data
                    };
                }
                case "ballotName": {
                    return {
                        ...state,
                        ballotName: data
                    };
                }
                case "code": {
                    return {
                        ...state,
                        code: data
                    };
                }
                case "title": {
                    return {
                        ...state,
                        title: data
                    };
                }
                case "question": {
                    return {
                        ...state,
                        question: data
                    };
                }
                default:
                    return state;
            }
        }
        default:
            return state;
    }
}