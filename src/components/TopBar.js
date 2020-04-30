import React from "react";
import {useSelector} from "react-redux";

function TopBar() {
    const classname = "top-bar";
    const contract = useSelector(state => state.ethereum.contract);
    const addressIsSet = Boolean(contract);
    const etherscanLink = addressIsSet ?
        `https://rinkeby.etherscan.io/address/${contract.options.address}` : "";

    let ethLinkElem = addressIsSet ?
        <div className={"etherscan-link"}>
            <a href={etherscanLink}>contrat intelligent</a>
        </div> : null;

    return(
        <>
            <div className={classname}>
                <p><strong>&nbsp;&nbsp;&nbsp;
                    <a href={"https://github.com/npasquie/vote-dapp-build"}>
                    vote-dapp</a>, une dapp ethereum par&nbsp;
                    <a href={"https://garageisep.com/"}>GarageISEP</a>
                </strong></p>
            </div>
            {ethLinkElem}
            <br/><br/>
        </>
    );
}

export default TopBar;