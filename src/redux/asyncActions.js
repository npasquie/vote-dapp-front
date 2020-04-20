import {changeWeb3ConnexionStatus, setError, setWeb3Instance} from "./actions";
import getWeb3 from "../web3/getWeb3";
import {WEB3_CONNEXION_STATUS} from "./constants";

const getWeb3Action = () => {
    return dispatch => {
        dispatch(changeWeb3ConnexionStatus(
            WEB3_CONNEXION_STATUS.PENDING));
        getWeb3().then(response => {
            dispatch(changeWeb3ConnexionStatus(
                WEB3_CONNEXION_STATUS.CONNECTED));
            dispatch(setWeb3Instance(response));
        })
        .catch(error => {
            dispatch(changeWeb3ConnexionStatus(
                WEB3_CONNEXION_STATUS.FAILED));
            dispatch(setError(error));
        })
    }
};

export {getWeb3Action};