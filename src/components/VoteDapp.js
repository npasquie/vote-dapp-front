import React from "react";
import VotePage from "./VotePage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import BallotCreatePage from "./BallotCreatePage";
import TopBar from "./TopBar";
import {useSelector} from "react-redux";
import {WEB3_CONNEXION_STATUS} from "../redux/constants";
import {handleError} from "../utils/utils";

function VoteDapp() {
    const web3Status = useSelector(state => state.ethereum.web3ConnexionStatus);
    const error = useSelector(state => state.ethereum.error);

    switch (web3Status) {
        case WEB3_CONNEXION_STATUS.PENDING: {
            return (
            <>
                <TopBar/>
                <p>En attente de la connexion web3 ...</p>
            </>
            );
        }
        case WEB3_CONNEXION_STATUS.CONNECTED: {
            return (
                <Router>
                    <TopBar/>
                    <Switch>
                        <Route path="/create">
                            <BallotCreatePage/>
                        </Route>
                        <Route path="/*">
                            <VotePage/>
                        </Route>
                    </Switch>
                </Router>
            );
        }
        case WEB3_CONNEXION_STATUS.FAILED: {
            return (
                <>
                    <TopBar/>
                    {handleError(error)}
                </>
            );
        }
        default:{
            return (
                <>
                    Erreur
                </>
            );
        }
    }
}

export default VoteDapp;