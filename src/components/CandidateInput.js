import React from "react";
import bytesInfo from "../utils/utils";
import {useSelector,useDispatch} from "react-redux";
import {changeCandidateName} from "../redux/actions";

function CandidateInput(props) {
    let classname = "candidate-input";
    const name = useSelector(state =>
        state.candidates.candidateNames[props.num - 1]);
    const dispatch = useDispatch();
    let nameId = "name" + props.num.toString();

    return(
        <div className={classname}>
            <label htmlFor={nameId}>Nom du candidat {props.num}</label>
            <input id={nameId}
                   type={"text"}
                   value={name}
                   onChange={e => dispatch(
                       changeCandidateName(props.num - 1,e.target.value))}/>
            {bytesInfo(name)}
            <br/>
        </div>
    );
}

export default CandidateInput;