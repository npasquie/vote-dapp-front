import React from "react";
import Candidate from "./Candidate";

function CandidatesGrid() {
    let classname = "candidates-grid";

    return(
        <div className={classname}>
            <Candidate/>
            <Candidate/>
        </div>
    );
}

export default CandidatesGrid;