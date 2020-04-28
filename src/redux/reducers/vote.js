import {CHOOSE_CANDIDATE, SET_VOTE_ELEM}
    from "../actionTypes";
import utils from "ballot-utils";

const initialState = {
    candidateNameSelected: null,
    ballotName: null,
    code: null,
    candidateNames: null,
    endTime: null,
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
                        title: utils.bytes32ToStr(data)
                    };
                }
                case "question": {
                    return {
                        ...state,
                        question: utils.bytes32ToStr(data)
                    };
                }
                case "candidateNames": {
                    return {
                        ...state,
                        candidateNames: utils.listBytes32ToListStr(data)
                    };
                }
                case "endTime": {
                    return {
                        ...state,
                        // unix epoch in milliseconds
                        endTime: new Date(data * 1000)
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