import React from "react";
import CandidatePicture from "./CandidatePicture";

function Candidate() {
    let classname = "candidate";

    return(
        <div className={classname}>
            <CandidatePicture/>
            <h3>Unchained</h3>
        </div>
    );
}

export default Candidate;