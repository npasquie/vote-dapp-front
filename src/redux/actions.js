import {
    ADD_CANDIDATE, REMOVE_CANDIDATE, CHANGE_CANDIDATE_NAME,
    CHANGE_BALLOT_ARG, CHANGE_WEB3_CONNEXION_STATUS, SET_WEB3_INSTANCE, SET_ERROR
}
    from "./actionTypes";

const addCandidate = () => ({
    type: ADD_CANDIDATE,
    payload: {}
});

const changeCandidateName = (id,name) => ({
    type: CHANGE_CANDIDATE_NAME,
    payload: {
        id: id,
        name: name}
});

const removeCandidate = () => ({
    type: REMOVE_CANDIDATE,
    payload: {}
});


const changeBallotArg = (data,argName) => ({
    type: CHANGE_BALLOT_ARG,
        payload: {
            data: data,
            argName: argName
        }
});

const changeWeb3ConnexionStatus = (status) => ({
    type: CHANGE_WEB3_CONNEXION_STATUS,
    payload: {
        status:status
    }
});

const setWeb3Instance = (instance) => ({
   type: SET_WEB3_INSTANCE,
   payload: {
       instance: instance
   }
});

const setError = (error) => ({
    type: SET_ERROR,
    payload: {
        error: error
    }
});

export {
    addCandidate,
    changeCandidateName,
    removeCandidate,
    changeBallotArg,
    changeWeb3ConnexionStatus,
    setWeb3Instance,
    setError
}