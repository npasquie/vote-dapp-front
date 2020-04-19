import {CHANGE_BALLOT_ARG} from "../actionTypes";

const initialState = {
    name : "",
    question: "",
    endDate: new Date(),
    mails: "",
    extEnabled: false
};

export default function(state = initialState, action) {
    switch (action.type){
        case CHANGE_BALLOT_ARG: {
            const {data,argName} = action.payload;
            switch (argName){
                case "name":
                    return {
                        ...state,
                        name: data
                    };
                case "question":
                    return {
                        ...state,
                        question: data
                    };
                case "endDate":
                    return {
                        ...state,
                        endDate: data
                    };
                case "mails":
                    return {
                        ...state,
                        mails: data
                    };
                case "extEnabled":
                    return {
                        ...state,
                        extEnabled: !state.extEnabled
                    };
                default:
                    return state;
            }
        }
        default:
            return state;
    }
}