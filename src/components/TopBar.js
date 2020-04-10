import React from "react";
import bcLabIcon from "../assets/BlockchainLab-icon.jpg";

function TopBar() {
    let classname = "top-bar";

    return(
        <div className={classname}>
            <img
                src={bcLabIcon}
                width="30"
                height="30"
                alt="vote-dapp logo"
            />
            <div>
                vote-dapp, une dapp ethereum par GarageISEP
            </div>
        </div>
    );
}

export default TopBar;