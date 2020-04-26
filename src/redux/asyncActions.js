import {
    addLog,
    changeDeploymentStatus,
    changeWeb3ConnexionStatus,
    setAccounts,
    setError,
    setWeb3Instance
} from "./actions";
import getWeb3 from "../web3/getWeb3";
import {BALLOT_DEPLOYMENT_STATUS, WEB3_CONNEXION_STATUS} from "./constants";
import {getBallotCreationArgs} from "./selectors";
import store from "./store";
import web3 from "web3";
import ballotInterface from "../../vote-dapp-contract/build/Ballot";
import {ballotArgsHandler} from "../../vote-dapp-contract/misc/ballot-utils";

const getState = store.getState; // this is a func

const getWeb3Action = () => {
    return dispatch => {
        dispatch(changeWeb3ConnexionStatus(
            WEB3_CONNEXION_STATUS.PENDING));
        getWeb3().then(response => {
            dispatch(getWeb3Accounts(response));
        })
        .catch(error => {
            handleWeb3Error(error,dispatch);
        })
    };
};

const getWeb3Accounts = (web3) => {
    return dispatch => {
        web3.eth.getAccounts().then(response => {
            dispatch(setWeb3Instance(web3));
            dispatch(setAccounts(response));
            dispatch(changeWeb3ConnexionStatus(
                WEB3_CONNEXION_STATUS.CONNECTED));
        }) // no catch needed, is already in getWeb3Action
    };
};

// ballot deployment :
// called 1st
const createBallot = () => {
    return dispatch => {
        dispatch(changeDeploymentStatus(BALLOT_DEPLOYMENT_STATUS.STARTED));
        log("deployment start",dispatch);
        const args = getBallotCreationArgs(getState());
        let dataToSend = {
            name: args.name,
            mails: args.mails,
            images: null
        };
        let jsonToSend = JSON.stringify(dataToSend);
        let req = new XMLHttpRequest();
        let voterCodeHashes;
        req.open("POST","/api/new-ballot",true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = () => {
            if (req.status === 200){ // success
                voterCodeHashes = req.response;
                dispatch(changeDeploymentStatus(
                    BALLOT_DEPLOYMENT_STATUS.STEP_2_CODE_HASHES_RECEIVED));
                log("voter's code's hashes received",dispatch);
                dispatch(deployBallotToTheBlockchain(args,voterCodeHashes));
            }
            else // server error
                handleServerError(req.response,dispatch);
        };
        req.onerror = () => {
            handleServerError("server communication error",dispatch);
        };
        req.send(jsonToSend);
        dispatch(changeDeploymentStatus(
            BALLOT_DEPLOYMENT_STATUS.STEP_1_SENT_TO_BACK));
        log("sent name and mails of the ballot",dispatch);
    }
};

// called 2nd
const deployBallotToTheBlockchain = (args,voterCodeHashes) => {
    return dispatch => {
        let newBallot = new web3.eth.Contract(ballotInterface.abi);
        const account = (state => state.ethereum.accounts[0])(getState());
        let newBallotAddress;
        newBallot.deploy({
            data: ballotInterface.bytecode,
            arguments: ballotArgsHandler(
                args.name,
                args.question,
                args.endDate,
                voterCodeHashes,
                args.extEnabled,
                null,
                args.candidateNames
            )
        }).send({
            from: account
        },((error,transactionHash) => {
            dispatch(changeDeploymentStatus(
                BALLOT_DEPLOYMENT_STATUS.STEP_3_TRANSACTION_SENT
            ));
            log(`transaction ${transactionHash} sent`,dispatch);
        })).then(newBallotInstance => {
                newBallotAddress = newBallotInstance.options.address;
                dispatch(changeDeploymentStatus(
                    BALLOT_DEPLOYMENT_STATUS.STEP_4_TRANSACTION_PASSED
                ));
                log(`new ballot's contract instance has been created at
                address ${newBallotAddress}`);
        }).catch(error => {
            handleServerError(error,dispatch);
        });
    }
};

function log(log,dispatch) {
    console.log(log);
    dispatch(addLog(log));
}

function handleServerError(msg,dispatch) {
    dispatch(changeDeploymentStatus(
        BALLOT_DEPLOYMENT_STATUS.FAILED));
    dispatch(addLog("error, see console for details"));
    console.log(msg);
}

function handleWeb3Error(error,dispatch) {
    dispatch(changeWeb3ConnexionStatus(
        WEB3_CONNEXION_STATUS.FAILED));
    dispatch(setError(error));
}

export {getWeb3Action,createBallot};