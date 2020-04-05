import React from "react";
import voteIcon from "../assets/vote-icon.png";

function SubmitVote() {
    let classname = "submit-vote";

    return(
        <div className={classname}>
            <button>
                <img src={voteIcon} alt={"vote"}/>
                <br/>
                vote !
            </button>
        </div>
    );
}

export default SubmitVote;