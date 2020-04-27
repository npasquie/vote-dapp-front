import React from "react";
import VoteTitle from "./VoteTitle";
import Question from "./Question";
import CandidatesGrid from "./CandidatesGrid";
import SubmitVote from "./SubmitVote";
import {useDispatch, useSelector} from "react-redux";
import {handleError} from "../utils/utils";
import {setVoteElem} from "../redux/actions";
import {fetchAddrAndSetContract} from "../redux/asyncActions";

/**
 * @return {null}
 */
function VotePage() {
    // hooks cannot be called conditionally (funcs "use<something>")
    const dispatch = useDispatch();
    const error = useSelector(state => state.vote.error);
    const contract = useSelector(state => state.ethereum.contract);
    const code = useSelector(state => state.vote.code);
    const ballotName = useSelector(state => state.vote.ballotName);
    const candidateNames = useSelector(state => state.vote.candidateNames);
    const classname  = "vote-page";
    const urlParams = new URLSearchParams(window.location.search);

    if (error)
        return handleError(error); // stops the script here
    if (!ballotName) {
        if (urlParams.get("name"))
            dispatch(setVoteElem("ballotName",urlParams.get("name")));
        else
            dispatch(setVoteElem("error",
                "erreur: le nom du scrutin n'est pas dans l'url"));
        return null;
    }
    if (!code) {
        if (urlParams.get("code"))
            dispatch(setVoteElem("code",urlParams.get("code")));
        else
            dispatch(setVoteElem("error",
                "erreur: le code du votant n'est pas dans l'url"));
        return null;
    }
    if (!contract) {
        dispatch(fetchAddrAndSetContract(ballotName));
        return null;
    }

    return (
        <div className={classname}>
            <VoteTitle text={"Élection du BDE ISEP mandat 2020-2021"}/>
            <Question text={"Quels bande de tocards va vous prendre de " +
            "haut pendant un an ?"}/>
            <CandidatesGrid/>
            <SubmitVote/>
        </div>
    );
}

export default VotePage;