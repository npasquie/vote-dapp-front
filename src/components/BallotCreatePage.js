import React from "react";
import BallotCreateForm from "./BallotCreateForm";
import {useSelector} from "react-redux";
import {BALLOT_DEPLOYMENT_STATUS} from "../redux/constants";
import VoteTitle from "./VoteTitle";
import Question from "./Question";

function BallotCreatePage() {
    const deploymentStatus = useSelector(state =>
        state.ballotCreate.deploymentStatus);
    const deploymentLogs = useSelector(state =>
        state.ballotCreate.deploymentLogs);

    if (deploymentStatus === BALLOT_DEPLOYMENT_STATUS.NOT_LAUNCHED)
        return(
            <BallotCreateForm/>
        );
    else {
        let mode = "";
        if (deploymentStatus === BALLOT_DEPLOYMENT_STATUS.SUCCESS)
            mode = "cool";
        else if (deploymentStatus === BALLOT_DEPLOYMENT_STATUS.FAILED)
            mode = "not-cool";
        return (
            <>
                <br/>
                <VoteTitle text={"Déploiement du vote"}/>
                <Question text={deploymentStatus} mode={mode}/>
                <Question text={"Logs :"}/>
                <br/>
                {deploymentLogs}
            </>
        );
    }
}

export default BallotCreatePage;