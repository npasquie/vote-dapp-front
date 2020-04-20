import React from "react";
import Candidate from "./Candidate";

function CandidatesGrid() {
    let classname = "candidates-grid";

    return(
        <div className={classname}>
            <Candidate name={"unchained"}/>
            <Candidate name={"cosmoz"}/>
            <Candidate name={"Jean-François Copé"}/>
        </div>
    );
}

export default CandidatesGrid;