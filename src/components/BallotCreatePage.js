import React, {useState} from "react";
import VoteTitle from "./VoteTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BallotCreatePage() {
    let classname = "ballot-create-page";
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [endDate, setEndDate] = useState(new Date());

    let nameId = "name";
    let questionId = "question";

    return(
        <div className={classname}>
            <VoteTitle text={"Créez un nouveau vote"}/>
            <label htmlFor={nameId}>Nom du vote</label>
            <input id={nameId}
                   type={"text"}
                   value={name}
                   onChange={e => setName(e.target.value)}/>
            <label htmlFor={questionId}>Question aux votants</label>
            <input id={questionId}
                   type={"text"}
                   value={question}
                   onChange={e => setQuestion(e.target.value)}/>
            <div>Date et heure de fin du vote</div>
            <DatePicker selected={endDate}
                        onChange={date => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"/>
        </div>
    );
}

export default BallotCreatePage;