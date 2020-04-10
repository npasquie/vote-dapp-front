import React from "react";
import VotePage from "./VotePage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import BallotCreatePage from "./BallotCreatePage";
import TopBar from "./TopBar";

function VoteDapp() {

    return(
        <Router>
            <Switch>
                <Route path="/create">
                    <TopBar/>
                    <BallotCreatePage/>
                </Route>
                <Route path="/*">
                    <TopBar/>
                    <VotePage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default VoteDapp;