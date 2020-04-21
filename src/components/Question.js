import React from "react";

function Question(props) {
    let classname = "question";

    return(
        <div className={classname}>
            {props.text}
        </div>
    );
}

export default Question;