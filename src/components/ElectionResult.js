import React from "react";
import ReactDOM from 'react-dom';
import { generateStore, EventActions } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import Ballot from "../build/Ballot";

function ElectionResult(){


  class Resulat extends React.Compenent{
  var resultObject= {}
  var candidateNames[] = bi.getCandidateNames
  for (var i=0, c= candidateNames.length; i<c ; i++){
    _candidateName = candidateNames[i]
    scoreCandidate = getCandidateScore(_candidateName)
    resultObject._candidateName = scoreCandidate;
  }
  return(
    <div className= "ElectionResult">
      <h1>Résultat élection</h1>
      <h2>Les scores sont:</h2>
      <li>{resultObject}</li>

    </div>
  );
}
}
