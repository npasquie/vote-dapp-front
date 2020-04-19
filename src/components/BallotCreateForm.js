import React from "react";
import VoteTitle from "./VoteTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CandidateInputList from "./CandidateInputList";
import bytesInfo from "../utils/utils";
import addrs from "email-addresses";
import {useSelector,useDispatch} from "react-redux";
import {changeBallotArg} from "../redux/actions";

function BallotCreateForm() {
    let classname = "ballot-create-form";
    const {name,question,endDate,mails,extEnabled}
        = useSelector(state =>
        state.ballotCreate);
    const dispatch = useDispatch();

    let nameId = "name";
    let questionId = "question";
    let mailsId = "mails";
    let extEnabledId = "extEnab";

    return(
        <div className={classname}>
            <VoteTitle text={"Créez un nouveau vote"}/>
            <br/>

            <label htmlFor={nameId}>Nom du vote</label>
            <input id={nameId}
                   type={"text"}
                   value={name}
                   onChange={e => dispatch(
                       changeBallotArg(e.target.value,"name"))}/>
            {bytesInfo(name)}
            <br/>

            <label htmlFor={questionId}>Question aux votants</label>
            <input id={questionId}
                   type={"text"}
                   value={question}
                   onChange={e => dispatch(
                       changeBallotArg(e.target.value,"question"))}/>
            {bytesInfo(question)}
            <br/>

            <div>Date et heure de fin du vote</div>
            <DatePicker selected={endDate}
                        onChange={date => dispatch(
                            changeBallotArg(date,"endDate"))}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"/>
            <div className={"incorrect-data"}>
                {Date.now() < endDate ?
                    "" :
                    "la date doit être dans le futur"}
            </div>
            <br/>

            <label htmlFor={mailsId}>
                Adresses e-mail des votants ATTENTION :
                n'entrez qu'une adresse par votant
            </label>
            <input id={mailsId}
                   type={"textarea"}
                   value={mails}
                   placeholder={"copiez-collez ici"}
                   onChange={e => dispatch(
                       changeBallotArg(e.target.value,"mails"))}/>
            {"nombre d'adresses détectées : "
            + (addrs.parseAddressList(mails) ?
                addrs.parseAddressList(mails).length :
                "0")}
            <br/>
            <br/>

            <label htmlFor={extEnabledId}>Activer les pénalités/bonus</label>
            <input type={"checkbox"} id={extEnabledId}
                   checked={extEnabled}
                   onChange={() => dispatch(
                       changeBallotArg({},"extEnabled"))}/>
            <br/>

            <CandidateInputList/>
            <br/>

            <button>Publier !</button>
        </div>
    );
}

export default BallotCreateForm;