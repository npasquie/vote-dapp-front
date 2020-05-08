import React from "react";
import def from "../assets/default-image.png";
import beachill from "../assets/beachill.jpg";
import furiours from "../assets/furiours.jpg";
import unchained from "../assets/unchained.jpg";
import voteBlanc from "../assets/conceit.jpg";

function CandidatePicture(props) {
    let classname = "candidate-picture";
    let img;
    switch (props.name){
        case "Unchained ⛓":
            img = unchained;
            break;
        case "Beach’ill 🏖":
            img = beachill;
            break;
        case "Furious 🐻":
            img = furiours;
            break;
        case "Vote blanc 🏳️":
            img = voteBlanc;
            break;
        default:
            img = def;
    }

    return(
        <div className={classname}>
            <img
                /* when implementing back, images will need to be converted to
                string, put in json, then sent to mongodb */
                // src={`data:image/jpeg;base64,${data}`}
                src={img}
                alt="candidate-picture"/>
        </div>
    );
}

export default CandidatePicture;