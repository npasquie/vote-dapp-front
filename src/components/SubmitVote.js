import React from "react";
import voteIcon from "../assets/vote-icon.png";
import {useDispatch} from "react-redux";
import {sendVote} from "../redux/asyncActions";

function SubmitVote() {
    const classname = "submit-vote";
    const dispatch = useDispatch();

    return(
        <div className={classname}>
            <button onClick={() => dispatch(sendVote())}>
                <img src={voteIcon} alt={"vote"}/>
                <br/>
                voter !
            </button>
        </div>
    );
}

export default SubmitVote;