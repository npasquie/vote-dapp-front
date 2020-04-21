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
    else
        return (
            <>
                <br/>
                <VoteTitle text={"Déploiement du vote"}/>
                <Question text={deploymentStatus}/>
                <Question text={"Logs :"}/>
                <br/>
                {deploymentLogs}
            </>
        );
}

export default BallotCreatePage;