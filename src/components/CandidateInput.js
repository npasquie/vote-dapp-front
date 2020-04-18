import React, {useState} from "react";
import bytesInfo from "../utils/utils";

function CandidateInput(props) {
    let classname = "candidate-input";

    const [name, setName] = useState("");

    let nameId = "name" + props.num.toString();

    return(
        <div className={classname}>
            <label htmlFor={nameId}>Nom du candidat {props.num}</label>
            <input id={nameId}
                   type={"text"}
                   value={name}
                   onChange={e => setName(e.target.value)}/>
            {bytesInfo(name)}
            <br/>
        </div>
    );
}

export default CandidateInput;