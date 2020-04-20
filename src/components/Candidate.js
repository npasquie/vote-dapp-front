import React from "react";
import CandidatePicture from "./CandidatePicture";
import {useDispatch, useSelector} from "react-redux";
import {chooseCandidate} from "../redux/actions";

function Candidate(props) {
    const classname = "candidate";
    const name = props.name;
    const selected =
        useSelector(state => state.vote.candidateNameSelected) === name;
    const dispatch = useDispatch();

    return(
        <div className={classname + (selected ? " clicked" : "")}>
            <button onClick={()=>dispatch(chooseCandidate(name))}>
                <CandidatePicture/>
                <h3>{name}</h3>
            </button>
        </div>
    );
}

export default Candidate;