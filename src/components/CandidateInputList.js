import React from "react";
import CandidateInput from "./CandidateInput";
import {addCandidate, removeCandidate} from "../redux/actions";
import {useDispatch, useSelector} from 'react-redux'

function CandidateInputList() {
    let classname = "candidate-input-list";
    const nameListLength = useSelector(state =>
        state.candidates.candidateNames.length);
    const dispatch = useDispatch();
    let inpList = [];
    for (let i = 0; i < nameListLength; i++){
        inpList = inpList.concat(<CandidateInput num={i+1} key={i+1}/>);
    }

    return(
        <div className={classname}>
            {inpList}
            <button onClick={() =>
                dispatch(addCandidate())
            }>+</button>
            {nameListLength > 2 ? <button onClick={() =>
                dispatch(removeCandidate())}>-</button> :
            ""}
        </div>
    );
}

export default CandidateInputList;