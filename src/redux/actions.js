import { ADD_CANDIDATE,REMOVE_CANDIDATE,CHANGE_CANDIDATE_NAME,
    CHANGE_BALLOT_ARG}
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
            argName: argName}
});

export {
    addCandidate,
    changeCandidateName,
    removeCandidate,
    changeBallotArg
}