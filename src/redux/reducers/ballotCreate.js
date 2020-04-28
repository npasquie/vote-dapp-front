import {ADD_LOG, CHANGE_BALLOT_ARG, CHANGE_DEPLOYMENT_STATUS} from "../actionTypes";
import {BALLOT_DEPLOYMENT_STATUS} from "../constants";
import React from "react";

const initialState = {
    name : null,
    question: null,
    endDate: null,
    mails: null,
    extEnabled: false,
    deploymentStatus: BALLOT_DEPLOYMENT_STATUS.NOT_LAUNCHED,
    deploymentLogs: []
};

export default function(state = initialState, action) {
    switch (action.type){
        case CHANGE_DEPLOYMENT_STATUS: {
            const {status} = action.payload;
            return {
                ...state,
                deploymentStatus: status
            }
        }
        case ADD_LOG: {
            const {log} = action.payload;
            return {
                ...state,
                deploymentLogs:
                    [...state.deploymentLogs,
                        <div className={"log"}
                             key={state.deploymentLogs.length}>
                            {log}</div>]
            }
        }
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