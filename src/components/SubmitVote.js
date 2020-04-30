import React, {useState} from "react";
import voteIcon from "../assets/vote-icon.png";
import {useDispatch, useSelector} from "react-redux";
import {sendVote} from "../redux/asyncActions";

function SubmitVote() {
    const classname = "submit-vote";
    const dispatch = useDispatch();
    const aCandidateIsSelected = useSelector(
        state => state.vote.candidateNameSelected) != null;
    const [pleaseSelectMessage,setPSMsg] = useState();

    let handleClick = () => {
        if (aCandidateIsSelected)
            dispatch(sendVote());
        else
            setPSMsg(<>Veuillez cliquer sur l'option de
                votre choix pour voter<br/><br/></>);
    };

    return(
        <div className={classname}>
            {pleaseSelectMessage}
            <button onClick={() => {handleClick()}}>
                <img src={voteIcon} alt={"vote"}/>
                <br/>
                voter !
            </button>
        </div>
    );
}

export default SubmitVote;