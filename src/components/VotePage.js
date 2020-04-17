import React from "react";
import VoteTitle from "./VoteTitle";
import Question from "./Question";
import CandidatesGrid from "./CandidatesGrid";
import SubmitVote from "./SubmitVote";

function VotePage() {
    let classname = "vote-page";

    return(
        <div className={classname}>
            <VoteTitle text={"Élection du BDE ISEP mandat 2020-2021"}/>
            <Question/>
            <CandidatesGrid/>
            <SubmitVote/>
        </div>
    );
}

export default VotePage;