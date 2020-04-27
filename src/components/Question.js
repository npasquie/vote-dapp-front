import React from "react";

function Question(props) {
    let classname = "question" + (props.mode ? "-" + props.mode : "");

    return(
        <div className={classname}>
            {props.text}
        </div>
    );
}

export default Question;