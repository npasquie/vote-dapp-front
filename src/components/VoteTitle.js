import React from "react";

function VoteTitle(props) {
    let classname = "vote-title";

    return(
        <div className={classname}>
            {props.text}
        </div>
    );
}

export default VoteTitle;