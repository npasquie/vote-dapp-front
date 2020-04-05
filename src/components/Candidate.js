import React, {useState} from "react";
import CandidatePicture from "./CandidatePicture";

function Candidate() {
    let classname = "candidate";
    const [clicked, setClicked] = useState(false);

    return(
        <div className={classname + (clicked ? " clicked" : "")}>
            <button onClick={()=>setClicked(!clicked)}>
                <CandidatePicture/>
                <h3>Unchained</h3>
            </button>
        </div>
    );
}

export default Candidate;