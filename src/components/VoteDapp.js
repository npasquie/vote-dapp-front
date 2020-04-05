import React from "react";
import VoteTitle from "./VoteTitle";
import Question from "./Question";
import CandidatesGrid from "./CandidatesGrid";

function VoteDapp() {

    return(
        <div>
            <VoteTitle/>
            <Question/>
            <CandidatesGrid/>
        </div>
    );
}

export default VoteDapp;