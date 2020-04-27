import {
    ADD_CANDIDATE, REMOVE_CANDIDATE, CHANGE_CANDIDATE_NAME,
    CHANGE_BALLOT_ARG, CHANGE_WEB3_CONNEXION_STATUS, SET_WEB3_INSTANCE,
    SET_ERROR, SET_ACCOUNTS, CHOOSE_CANDIDATE, CHANGE_DEPLOYMENT_STATUS,
    ADD_LOG, SET_CONTRACT, SET_VOTE_ELEM
}
    from "./actionTypes";

export const addCandidate = () => ({
    type: ADD_CANDIDATE,
    payload: {}
});

export const changeCandidateName = (id,name) => ({
    type: CHANGE_CANDIDATE_NAME,
    payload: {
        id: id,
        name: name}
});

export const removeCandidate = () => ({
    type: REMOVE_CANDIDATE,
    payload: {}
});


export const changeBallotArg = (data,argName) => ({
    type: CHANGE_BALLOT_ARG,
        payload: {
            data: data,
            argName: argName
        }
});

export const changeWeb3ConnexionStatus = (status) => ({
    type: CHANGE_WEB3_CONNEXION_STATUS,
    payload: {
        status:status
    }
});

export const setWeb3Instance = (instance) => ({
   type: SET_WEB3_INSTANCE,
   payload: {
       instance: instance
   }
});

export const setAccounts = (accounts) => ({
   type: SET_ACCOUNTS,
    payload: {
       accounts: accounts
    }
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: {
        error: error
    }
});

export const chooseCandidate = (candidateName) => ({
    type: CHOOSE_CANDIDATE,
    payload: {
        candidateName: candidateName
    }
});

export const addLog = (log) => ({
   type: ADD_LOG,
   payload: {
       log: log
   }
});

export const changeDeploymentStatus = (status) => ({
    type: CHANGE_DEPLOYMENT_STATUS,
    payload: {
        status: status
    }
});

export const setVoteElem = (elem,data) => ({
    type: SET_VOTE_ELEM,
    payload: {
        elem:elem,
        data: data
    }
});

export const setContract = (contract) => ({
    type: SET_CONTRACT,
    payload: {
        contract: contract
    }
});