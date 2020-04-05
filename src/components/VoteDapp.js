import React from "react";
import VoteTitle from "./VoteTitle";
import Question from "./Question";
import CandidatesGrid from "./CandidatesGrid";
import SubmitVote from "./SubmitVote";

function VoteDapp() {
    let classname = "vote-dapp";

    return(
        <div className={classname}>
            <VoteTitle/>
            <Question/>
            <CandidatesGrid/>
            <SubmitVote/>
        </div>
    );
}

export default VoteDapp;