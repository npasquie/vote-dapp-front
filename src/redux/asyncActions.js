import {
    addLog,
    changeDeploymentStatus,
    changeWeb3ConnexionStatus,
    setAccounts,
    setContract,
    setError,
    setVoteElem,
    setWeb3Instance
} from "./actions";
import getWeb3 from "../web3/getWeb3";
import {
    BALLOT_DEPLOYMENT_STATUS,
    VOTE_STATUS,
    WEB3_CONNEXION_STATUS} from "./constants";
import {getBallotCreationArgs} from "./selectors";
import store from "./store";
import ballotUtils from "ballot-utils";
import ballotInterface from "Ballot";
import Question from "../components/Question";
import React from "react";

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

const sendVote = () => {
    return dispatch => {
        let {contract, accounts} = getState().ethereum;
        let {candidateNameSelected, code} = getState().vote;
        let vote = ballotUtils.strToBytes32(candidateNameSelected);
        let codeArg = ballotUtils.strToBytes32(code);

        dispatch(setVoteElem("voteStatus",VOTE_STATUS.WAITING_SIGNATURE));
        contract.methods.vote(vote,codeArg).send({from: accounts[0]})
            .then(() => {
            dispatch(setVoteElem("voteStatus",VOTE_STATUS.SUCCESS));
        }).catch(error => {
            handleVoteError(error,dispatch);
        });
    };
};

const fetchAddrAndSetContract = (name) => {
    return dispatch => {
        let req = new XMLHttpRequest();
        let nameURI = encodeURIComponent(name);
        req.open("GET",`/api/get-address/${nameURI}`,true);
        req.onload = () => {
            if (req.status === 200) { // success
                let address = JSON.parse(req.response);
                let web3 = getState().ethereum.web3Instance;
                let contract = new web3.eth.Contract(
                    ballotInterface.abi,address);
                dispatch(setContract(contract));
            } else
                handleVoteError(req.response,dispatch);
        };
        req.onerror = () => {
            handleVoteError("server communication error",dispatch);
        };
        req.send();
    };
};

const fetchScores = () => {
    return dispatch => {
        let contract = getState().ethereum.contract;
        let candidateNames = getState().vote.candidateNames;
        let candidatesInfos = [];
        let maxScore = 0;
        candidateNames.forEach((name,i) => {
            contract.methods.getCandidateScore(
                ballotUtils.strToBytes32(name)).call()
                .then(res => {
                    candidatesInfos.push(
                        {name: name, score: res}
                    );
                    maxScore = res > maxScore ? res : maxScore;
                    if (i === candidateNames.length - 1) // on last candidate
                        saveScores(candidatesInfos,maxScore,dispatch);
                });
        });
    }
};

function saveScores(candidatesInfos,maxScore,dispatch) {
    let scores = [];
    let isWinner;

    candidatesInfos.forEach((info,i) => {
        isWinner = info.score === maxScore;
        scores.push(
            <Question
                text={`${info.name}: ${info.score} ` +
                `${isWinner ? "(victoire)" : ""}`}
                mode={isWinner ? "cool" : undefined}
                key={i}
            />
       );
    });
    dispatch(setVoteElem("scores", scores));
}

// <Question
//     text={name + ": " + res}
//     key={i}/>

const fetchContractData = () => {
    return dispatch => {
        let contract = getState().ethereum.contract;
        let tempError = null;
        let calls = [
            {func: contract.methods.getQuestion(), elName: "question"},
            {func: contract.methods.getName(), elName: "title"},
            {func: contract.methods.getCandidateNames(),
                elName: "candidateNames"},
            {func: contract.methods.getEndTime(), elName: "endTime"}];
        calls.forEach(callObj => {
            if (!tempError){
                callObj.func.call().then( result => {
                    dispatch(setVoteElem(callObj.elName,result));
                }).catch( error => {
                    tempError = error;
                });
            } else {
                dispatch(setVoteElem("error",tempError));
                return null;
            }
        });
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
        req.open("POST","/api/new-ballot",true); // true is for async mode
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = () => {
            if (req.status === 200){ // success
                voterCodeHashes = JSON.parse(req.response);
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
        const web3 = (state => state.ethereum.web3Instance)(getState());
        let newBallot = new web3.eth.Contract(ballotInterface.abi);
        const account = (state => state.ethereum.accounts[0])(getState());
        let newBallotAddress;
        newBallot.deploy({
            data: ballotInterface.bytecode,
            arguments: ballotUtils.ballotArgsHandler(
                args.name,
                args.question,
                args.endDate,
                voterCodeHashes,
                args.extEnabled,
                null,
                args.candidateNames)
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
                address ${newBallotAddress}`,dispatch);
                dispatch(sendBallotAddressToBack(args.name,newBallotAddress));
        }).catch(error => {
            handleServerError(error,dispatch);
        });
    };
};

// called 3rd and last
const sendBallotAddressToBack = (name, address) => {
    return dispatch => {
        let dataToSend = {
            name: name,
            address: address
        };
        let jsonToSend = JSON.stringify(dataToSend);
        let req = new XMLHttpRequest();
        req.open("POST","/api/set-ballot-address",true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = () => {
            if (req.status === 200){ // success
                dispatch(changeDeploymentStatus(
                    BALLOT_DEPLOYMENT_STATUS.SUCCESS));
                log("new ballot was successfully deployed, mails" +
                    " are being send to voters",dispatch);
            }
            else // server error
                handleServerError(req.response,dispatch);
        };
        req.onerror = () => { // communication error
            handleServerError("server communication error",dispatch);
        };
        req.send(jsonToSend);
        dispatch(changeDeploymentStatus(
            BALLOT_DEPLOYMENT_STATUS.STEP_5_ADDRESS_SENT_TO_BACK));
        log("sent name and mails of the ballot",dispatch);
    };
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

function handleVoteError(error,dispatch) {
    dispatch(setVoteElem("error",error));
}

export {
    getWeb3Action,
    createBallot,
    fetchAddrAndSetContract,
    fetchContractData,
    sendVote,
    fetchScores};