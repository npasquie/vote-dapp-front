import React from "react";
import Candidate from "./Candidate";

function CandidatesGrid(props) {
    let classname = "candidates-grid";
    const candidatesNames = props.candidates;
    let candidates = [];

    candidatesNames.forEach((name,i) => {
       candidates.push(<Candidate name={name} key={i}/>);
    });
    return(
        <div className={classname}>
            {candidates}
        </div>
    );
}

export default CandidatesGrid;