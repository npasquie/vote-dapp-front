import Web3 from "web3";
import React from "react";

function bytesInfo(str){
    let bytes =  Web3.utils.hexToBytes(Web3.utils.utf8ToHex(str));
    let okBytes = bytes.slice(0,32).toString();

    let errorPart;
    if(bytes.length === 0)
        errorPart = "pas de donnée";
    else if (bytes.length > 32)
        errorPart = "," + bytes.slice(32).toString() + " trop long";
    else
        errorPart = "";
    return(
        <div>
            octets : {okBytes}
            <div className={"incorrect-data"}>
                {errorPart}
            </div>
        </div>
    );
}

export default bytesInfo;