import {CHANGE_WEB3_CONNEXION_STATUS, SET_ACCOUNTS, SET_CONTRACT, SET_ERROR, SET_WEB3_INSTANCE}
    from "../actionTypes";

const initialState = {
    web3Instance: null,
    web3ConnexionStatus: null,
    error: null, // used when getting web3 and the contract
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
            const {error} = action.payload;
            return {
                ...state,
                error: error
            }
        }
        case SET_ACCOUNTS: {
            const {accounts} = action.payload;
            return {
                ...state,
                accounts: accounts
            }
        }
        case SET_CONTRACT: {
            const{contract} = action.payload;
            return {
                ...state,
                contract: contract
            }
        }
        default:
            return state;
    }
}