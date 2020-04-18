import React, {useState} from "react";
import CandidateInput from "./CandidateInput";

function CandidateInputList() {
    let classname = "candidate-input-list";
    const [inpList, setInpList] = useState(
        [<CandidateInput num={1} key={1}/>,
         <CandidateInput num={2} key={2}/>]);

    return(
        <div className={classname}>
            {inpList}
            <button onClick={() => {
                let num = inpList.length + 1;
                setInpList(inpList.concat(
                <CandidateInput num={num} key={num}/>
            ))}}>+</button>
            {inpList.length > 2 ? <button onClick={() => {
                setInpList(inpList.slice(0,inpList.length - 1))}}>-</button> :
            ""}
        </div>
    );
}

export default CandidateInputList;