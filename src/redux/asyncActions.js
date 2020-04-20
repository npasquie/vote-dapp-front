import {changeWeb3ConnexionStatus,
        setAccounts,
        setError,
        setWeb3Instance} from "./actions";
import getWeb3 from "../web3/getWeb3";
import {WEB3_CONNEXION_STATUS} from "./constants";

const getWeb3Action = () => {
    return dispatch => {
        dispatch(changeWeb3ConnexionStatus(
            WEB3_CONNEXION_STATUS.PENDING));
        getWeb3().then(response => {
            dispatch(getWeb3Accounts(response));
        })
        .catch(error => {
            handleError(error,dispatch);
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
        }).catch(error => {
            handleError(error,dispatch);
        })
    };
};

function handleError(error,dispatch) {
    dispatch(changeWeb3ConnexionStatus(
        WEB3_CONNEXION_STATUS.FAILED));
    dispatch(setError(error));
}

export {getWeb3Action};