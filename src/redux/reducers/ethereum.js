import {CHANGE_WEB3_CONNEXION_STATUS, SET_ERROR, SET_WEB3_INSTANCE}
    from "../actionTypes";

const initialState = {
    web3Instance: null,
    web3ConnexionStatus: null,
    error: null,
    accounts: null,
    contract: null
};

export default function(state = initialState, action) {
    switch (action.type){
        case CHANGE_WEB3_CONNEXION_STATUS: {
            const {status} = action.payload;
            return {
                ...state,
                web3ConnexionStatus: status
            };
        }
        case SET_WEB3_INSTANCE: {
            const {instance} = action.payload;
            return {
                ...state,
                web3Instance: instance
            }
        }
        case SET_ERROR: {
            const {error} = action.error;
            return {
                ...state,
                error: error
            }
        }
        default:
            return state;
    }
}